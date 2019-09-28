import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader/loader.service';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/auth/token.service';
import { ToastService } from '../../services/toast/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  email : string;
  password : string;

  fg = new FormGroup({
    email : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  })

  constructor(private loaderService : LoaderService,
              private authService : AuthService,
              private tokenService : TokenService,
              private toastService : ToastService,
              private navCtrl : NavController) { }

  ngOnInit() {
  }

  signin() {
    let data  = {
      email : this.email,
      password : this.password
    }
    // this.loaderService.presentLoading();
    this.authService.login(data)
        .subscribe(
            (resp) => {
              // this.loaderService.dismissLoading();
                this.tokenService.setToken(resp['token']);
                this.toastService.presentToast('Login Successfull');
                this.navCtrl.navigateForward('home');                  
            },
            (error) => {
              // this.loaderService.dismissLoading();
              this.toastService.presentToast('Username or password is incorrect');
            }
        )
  }

  goToGetStarted() {
    this.navCtrl.navigateForward('get-started');
  }
  
  
  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }

}
