import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ToastService } from '../../services/toast/toast.service';
import { GetStartedService } from '../../services/get-started/get-started.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  companyList : any =[];
  title = "Registration";
  requestedEmail : boolean = true;    //true when email exist in requested list table createdd by admin else false
  emailExist :boolean = false;      // false when user not already registred with this email else true
  

  fg = new FormGroup({
    company : new FormControl('', [Validators.required]),
    hire : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    dob : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    nokName : new FormControl('', [Validators.required]),
    nokContact : new FormControl('', [Validators.required]),
    payment_mode : new FormControl({value : '', disable : true}),
    bank_name : new FormControl('', [Validators.required]),
    bsb : new FormControl('', [Validators.required]),
    account_number : new FormControl('', [Validators.required]),
    rate : new FormControl({value : '', disable : true}),
    site : new FormControl({value : '', disable : true}),
    additional_rate : new FormControl({value : '', disable : true}),
    additional_site : new FormControl({value : '', disable : true}),
    tax_free : new FormControl(''),
    residence : new FormControl(''),
    loan : new FormControl(''),
    financial : new FormControl(''),
    additional_info : new FormControl(''),
    fund_name : new FormControl('', [Validators.required]),
    account_name : new FormControl('', [Validators.required]),
    membership : new FormControl('', [Validators.required]),
    security_licence : new FormControl('', [Validators.required]),
    securit_expiry : new FormControl('', [Validators.required]),
    certificate : new FormControl('', [Validators.required]),
    driver_licence : new FormControl('', [Validators.required]),
    state : new FormControl('', [Validators.required]),
    driving_expiry : new FormControl('', [Validators.required]),
    note : new FormControl('', [Validators.required])
  })

  constructor(private registerService : RegisterService,
              private loaderService : LoaderService,
              private toastService : ToastService,
              private getStartedService : GetStartedService,
              private navCtrl : NavController,
              private activatedRoute : ActivatedRoute) {
                this.activatedRoute.params.subscribe(
                  (resp)=> {
                    console.log(resp);
                    if(resp) {
                      console.log( resp['email']);
                    this.fg.get('email').setValue(resp['email']);
                    }
                  }
                )
               }

  ngOnInit() {
    this.getCompanyList();
  }
  

  getCompanyList() {
    // this.loaderService.presentLoading();
    this.registerService.getCompanyList().subscribe(
      (resp) =>{
        // this.loaderService.dismissLoading();
        this.companyList = resp;
      },
      (error) => {
        // this.loaderService.dismissLoading();
      }
    )
  }

  checkTaxDetail() {
    console.log(this.fg.value.tax_free);
    if(this.fg.value.tax_free == 1) {
      this.fg.get('residence').setValidators([Validators.required]);
      this.fg.get('loan').setValidators([Validators.required]);
      this.fg.get('financial').setValidators([Validators.required]);
    }
    else {
      this.fg.get('residence').setValidators(null);
      this.fg.get('loan').setValidators(null);
      this.fg.get('financial').setValidators(null);
      // this.fg.get('residence').clearValidators();
      // this.fg.get('financial').clearValidators();
      // this.fg.get('residence').clearValidators();
    }
  }
  
  register() {
    if(!this.fg.valid) {
      this.toastService.presentToast('Please fill required fields');
      return false;
    }
    if(!this.requestedEmail) {
      this.toastService.presentToast('This email is not in requested list. Please contact admin');
      return false;
    }
    if(this.emailExist) {
      this.toastService.presentToast('This email is already registered, try different email');
      return false;
    }
    this.loaderService.presentLoading();
    let tax_detail = {};
    this.fg.value.dob = this.fg.value.dob.split('T')[0];
    this.fg.value.securit_expiry = this.fg.value.securit_expiry.split('T')[0];
    this.fg.value.driving_expiry = this.fg.value.driving_expiry.split('T')[0];
    if(this.fg.value.tax_free == 1) {
      tax_detail = {
        'tax_free' : this.fg.value.tax_free,
        'australian_residence' : this.fg.value.residence,
        'education_debt' : this.fg.value.loan,
        'financial_debt' : this.fg.value.financial,
        'additional_information' : this.fg.value.additional_info
      }
    }
    else {
      tax_detail = {}
    }

    let data = {
      'user' : {
        'name' : this.fg.value.name,
        'surname' : this.fg.value.surname,
        'password' : this.fg.value.password,
        'email' : this.fg.value.email,
        'dob' : this.fg.value.dob,
        'mobile' : this.fg.value.phone,
        'address' : this.fg.value.address,
        'nok_name' : this.fg.value.nokName,
        'nok_contact' : this.fg.value.nokContact,
        'user_type' : 'user'
      },
      'company' : {
        'hire' : this.fg.value.hire,
        'fk_company_id' : this.fg.value.company
      },
      'payment_mode' : {
        'bank_name' : this.fg.value.bank_name,
        'bsb_number' : this.fg.value.bsb,
        'account_number' : this.fg.value.account_number
      },
      'tax_detail' : tax_detail,
      'superannuation' : {
        'fund_name' : this.fg.value.fund_name,
        'account_name' : this.fg.value.account_name,
        'membership_number' : this.fg.value.membership
      },
      'security_license' : {
        'license_number' : this.fg.value.security_licence,
        'expiry' : this.fg.value.securit_expiry,
        'certificate' : this.fg.value.certificate
      },
      'driving_license' : {
        'license_number' : this.fg.value.driver_licence,
        'expiry' : this.fg.value.driving_expiry,
        'state' : this.fg.value.state,
        'note' : this.fg.value.note
      }
    }
    this.registerService.register(data).subscribe(
      (resp) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Registered successfully');
        this.navCtrl.navigateForward('sign-in');
      },
      (error) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Something went wrong, please check all fields');
      }
    )
  }

  check() {
    console.log(this.fg.value.hire);
  }

  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }

}
