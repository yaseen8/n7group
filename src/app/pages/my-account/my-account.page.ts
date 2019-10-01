import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  title = "My Account";
  userData : any = {};

  constructor(private userService : UserService,
              private loaderService : LoaderService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.loaderService.presentLoading();
    this.userService.getUserProfile().subscribe(
      (resp : any) => {
        console.log(resp);
        this.userData = resp;
        this.loaderService.dismissLoading();
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }

}
