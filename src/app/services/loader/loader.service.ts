import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingController : LoadingController) { }

  async presentLoading() {
     const loading = await this.loadingController.create({
      message: 'Please wait',
    });
    await loading.present();
  }

  async dismissLoading(){
    return await this.loadingController.dismiss();
  }
}
