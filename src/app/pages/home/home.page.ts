import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = "Home";
  user={
    name: "John",
    address: "1045 Aurora Blvd, Quezon City, 1109 Metro Manila, Philippines",
    timingFrom: "8:00 AM",
    timingTo: "6:00 PM"
  }

  constructor() {}

}
