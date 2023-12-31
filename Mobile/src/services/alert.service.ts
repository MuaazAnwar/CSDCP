import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentSuccessAlert(text: any) {
    // alert with no buttons, just information
    const alert = await this.alertController.create({
      message: text,
    });
    await alert.present();
  }

  async presentErrorAlert(text: any, buttons = ['OK']) {
    const alert = await this.alertController.create({
      message: text,
      buttons: buttons,
    });
    await alert.present();
  }
  async presentErrorAlertIWithoutButton(text: any) {
    const alert = await this.alertController.create({
      message: text,
    });
    await alert.present();
  }
}
