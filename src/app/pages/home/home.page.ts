import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../services/loader/loader.service';
import { JobCheckInService } from '../../services/job-check-in/job-check-in.service';
import { ToastService } from '../../services/toast/toast.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData : any = {};
  currentDate  = new Date();
  jobDetail : any = {};
  checkedIn : boolean = false;
  checkInComplteted :boolean = false;
  checkInDetail : any = {};
  title = "Home";
  showData : boolean = true;
  lat : any;
  long : any;
  currentAddress : any;

  constructor(private authService : AuthService,
              private loaderService : LoaderService,
              private jobCheckInService : JobCheckInService,
              private toastService : ToastService,
              private diagnostic : Diagnostic,
              private locationAccuracy: LocationAccuracy,
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder) {

        this.authService.loginStatusChange.subscribe(
          (resp) => {
            console.log(resp);
            if(resp) {
              this.authService.checkLoggedIn().subscribe(
                (resp) => {
                  console.log('home',resp);
                  this.userData = resp;
                }
              )
            }
          },
          (error) =>{
          }
        )
    this.checkAndGetCurrentLocation();
  }

  checkAndGetCurrentLocation() {
    this.diagnostic.isLocationEnabled().then(
      (resp) => {
        if(!resp) {
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {
            // if(canRequest) {
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                (resp) => {
                  this.getCurrentLatLong();
                },
                (error) => 
                {
                  this.checkAndGetCurrentLocation();
                }
              );
            // }
          
          });
        }
        else {
          this.getCurrentLatLong();
        }
      },
      (error) => {
      }
    )
  }

  getCurrentLatLong() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.long =  resp.coords.longitude
      if(this.lat && this.long) {
        this.geAddressFromLatLong();
      }
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  geAddressFromLatLong() {
    let options : NativeGeocoderOptions  = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.lat, this.long, options)
  .then((result: NativeGeocoderResult[]) => {
    this.currentAddress = result[0].areasOfInterest + ' ' + result[1].areasOfInterest + ' ' + result[0].subLocality + ' ' + result[0].locality + ' ' + result[0].administrativeArea + ' ' + result[0].countryName;
  }) 
  .catch((error: any) => console.log(error));

// this.nativeGeocoder.forwardGeocode('Berlin', options)
//   .then((result: NativeGeocoderResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
//   .catch((error: any) => console.log(error));
  }

  ngOnInit() {
    this.getUserJobDetail();
    this.getCheckInDetail();
  }

  getUserJobDetail() {
    // this.loaderService.presentLoading();
    this.jobCheckInService.getJobDetail().subscribe(
      (resp) => {
        // this.loaderService.dismissLoading();
        console.log(resp);
        
        if(resp) {
          this.jobDetail = resp;
          this.showData = true;
        }
        else {
          this.showData = false;
        }
      },
      (error) => {
        // this.loaderService.dismissLoading();
        this.showData = false;
      }
    )
  }

  getCheckInDetail() {
    let date = this.getCurrentDate();
    console.log(date);
    this.jobCheckInService.getCheckInDetail(date).subscribe(
      (resp : any) => {
        console.log(resp);
        this.checkInDetail = resp;
        if(resp && resp.check_in && !resp.check_out) {
          this.checkedIn = true;
        }
        if(resp && resp.check_in && resp.check_out) {
          this.checkInComplteted = true;
        }
      },
      (error) => {
        this.checkedIn = false;
      }
    )
  }

  checkInUser() {
    if(!this.currentAddress) {
      this.toastService.presentToast('Please enable your location');
      return false;
    }
    let data = {
      'check_in_location' : this.currentAddress
    }
    this.loaderService.presentLoading();
    this.jobCheckInService.checkInUser(data).subscribe(
      (resp) => {
        if(resp) {
          this.loaderService.dismissLoading();
          this.toastService.presentToast('User checkin successfully');
          this.checkedIn = true;
        }
        else {
          this.loaderService.dismissLoading();
          this.toastService.presentToast('Some thing went wrong');
          this.checkedIn = false;
        }
      },
      (error) =>{
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Some thing went wrong');
        this.checkedIn = false;
      }
    )
  }

  checkoutUser() {
    if(!this.currentAddress) {
      this.toastService.presentToast('Please enable your location');
      return false;
    }
    this.loaderService.presentLoading();
    let data = {
      'checkin_date' : this.getCurrentDate(),
      'check_out_location' : this.currentAddress
    }
    this.jobCheckInService.checkoutUser(data).subscribe(
      (resp) => {
        if(resp) {
          this.loaderService.dismissLoading();
          this.toastService.presentToast('User checkout successfully');
          this.checkInDetail = resp;
          this.checkInComplteted = true;
        }
        else {
          this.loaderService.dismissLoading();
          this.toastService.presentToast('Something went wrong');
          this.checkInComplteted = false;
        }
      },
      (error) =>{
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong');
        this.checkInComplteted = false;
      }
    )
  }

  getCurrentDate() {
    let date = new Date();
    let mm : any;
    let dd : any;
    dd = date.getDate();
    if(dd < 9) {
      dd = '0' + dd;
    }
    mm = date.getMonth() + 1;
    if(mm <= 9) {
      mm = '0' + mm;
    }
    let yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }



}
