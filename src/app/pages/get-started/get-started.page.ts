import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoaderService } from '../../services/loader/loader.service';
import { GetStartedService } from '../../services/get-started/get-started.service';
import { ToastService } from '../../services/toast/toast.service';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {
  title="Get Started";
  email : string = '';
  showMessage : boolean = false;
  emailExist : boolean = false;

  constructor(private navCtrl : NavController,
              private loaderService : LoaderService,
              private getStartedService : GetStartedService,
              private toastService : ToastService,
              private registerService : RegisterService) { }

  checkEmail() {
    // this.loaderService.presentLoading();
    this.getStartedService.checkEmail(this.email).subscribe(
      (resp : any) => {
        // this.loaderService.dismissLoading();
        if(resp.length) {
          this.showMessage = false;
          this.navCtrl.navigateForward('register/' + this.email);

        }
        else {
          this.showMessage = true;
        }
      },
      (error) =>{
        this.loaderService.dismissLoading();
        this.showMessage = true;
      }
    )
  }

  checkUserEmail() {                                             //This function checks wether user already registered with this email
    if(!this.email) {
      this.toastService.presentToast('Please provide email');
      return false;
    }
    this.registerService.checkUserEmail(this.email).subscribe(
      (resp : any) => {
        this.loaderService.dismissLoading();
        if(resp.length) {
          this.emailExist = true;
        }
        else {
          this.emailExist = false;
          this.checkEmail();
        }
      },
      (error) =>{
        this.loaderService.dismissLoading();
        this.emailExist = false;
      }
    )
  }

  ngOnInit() {
  }

  goToSignin() {
    this.navCtrl.navigateForward('sign-in');
  }

}
