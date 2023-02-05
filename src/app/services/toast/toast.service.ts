import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly toastController: ToastController) { }

  async presentToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message,
      cssClass,
      duration: 1500,
      position: 'bottom',
      animated: true,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  }
}
