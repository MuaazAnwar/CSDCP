// configuration-modal.component.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RuntimeConfigService } from './../../services/config.service';

@Component({
  selector: 'app-configuration-modal',
  templateUrl: 'configuration-modal.component.html',
})
export class ConfigurationModalComponent {
  backendUrl: string;
  useMockResponse: boolean;

  constructor(
    private modalCtrl: ModalController,
    private configService: RuntimeConfigService
  ) {
    this.backendUrl = this.configService.baseURL;
    this.useMockResponse = this.configService.useMockResponse;
  }

  saveConfig() {
    this.configService.baseURL = this.backendUrl;
    this.configService.useMockResponse = this.useMockResponse;
    this.modalCtrl.dismiss();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
