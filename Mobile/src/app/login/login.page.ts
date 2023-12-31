import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { DataService } from 'src/services/data.service';
import { MenuController } from '@ionic/angular';
import { HTTPService } from 'src/services/http.service';
import { ModalController } from '@ionic/angular';
import { ConfigurationModalComponent } from './../configuration-modal/configuration-modal.component';
import { RuntimeConfigService } from './../../services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: any;
  password: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private dataService: DataService,
    public menu: MenuController,
    private httpService: HTTPService,
    private modalCtrl: ModalController,
    private RuntimeConfig: RuntimeConfigService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // disabling the menu on login page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the menu when leaving the login page
    this.menu.enable(true);
  }

  onLoginClick() {
    if (this.RuntimeConfig.useMockResponse) {
      if (!this.email && !this.password) {
        this.alertService.presentErrorAlert(
          'Please enter email and password to login!'
        );
        return;
      }
      this.dataService.addData('userId', 1);
      this.dataService.addData('name', 'John Doe');
      this.dataService.addData('userName', 'JohnDoe');
      this.dataService.addData('earnings', 89);
      this.dataService.addData('rating', 4.3);
      this.router.navigate(['/home']);
    } else {
      // call http request to login
      this.httpService
        .post('/login?login_type=mobile', {
          username: this.email,
          password: this.password,
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.dataService.addData('userId', response.userId);
            this.dataService.addData('name', response.name);
            this.dataService.addData('userName', response.userName);
            //if wallet amount is not present then add it as 0
            if (!response.walletAmount) {
              response.walletAmount = 0;
            }
            this.dataService.addData('earnings', response.walletAmount);
            // rating is not present then add it as 0
            if (!response.rating) {
              response.rating = 0;
            }
            this.dataService.addData('rating', response.rating);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log('error', error);
            this.alertService.presentErrorAlertIWithoutButton(error.message);
          }
        );
    }
  }
  async openConfigModal() {
    const modal = await this.modalCtrl.create({
      component: ConfigurationModalComponent,
    });
    await modal.present();
  }
}
