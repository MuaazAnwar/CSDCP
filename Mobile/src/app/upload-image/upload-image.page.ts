import { DataService } from 'src/services/data.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { MenuController } from '@ionic/angular';
import { HTTPService } from 'src/services/http.service';
import { AlertService } from 'src/services/alert.service';
import { environment } from 'src/environments/environment';
import { RuntimeConfigService } from 'src/services/config.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  firstPicture: any = {};
  secondPicture: any = {};
  thirdPicture: any = {};
  labelsList: any = [];
  label: any = null;

  constructor(
    private httpService: HTTPService,
    public menu: MenuController,
    private alertService: AlertService,
    private dataService: DataService,
    private RuntimeConfig: RuntimeConfigService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    //   this.firstPicture = {};
    //   this.secondPicture = {};
    //   this.thirdPicture = {};
    //   this.label = null;
    //   this.fetchLabelsList();
  }

  public async takeFirstPicture() {
    // Take a photo
    this.firstPicture = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  public async takeSecondPicture() {
    // Take a photo
    this.secondPicture = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  public async takeThirdPicture() {
    // Take a photo
    this.thirdPicture = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  public fetchLabelsList() {
    //
    if (this.RuntimeConfig.useMockResponse) {
      this.labelsList = [
        {
          id: 1,
          labelName: 'Pizza',
        },
        {
          id: 2,
          labelName: 'Burger',
        },
      ];
    } else {
      this.httpService.get('/data_label/list').subscribe(
        (response) => {
          console.log(response);
          this.labelsList = response;
          // Assign LabelsList to the response
        },
        (error) => {
          console.log(error);
          // use alreat service to show error
          this.alertService.presentErrorAlertIWithoutButton(error.message);
        }
      );
    }
  }

  ionViewWillEnter() {
    this.menu.close();
    this.firstPicture = {};
    this.secondPicture = {};
    this.thirdPicture = {};
    this.label = null;
    this.fetchLabelsList();
  }

  dataUrlToBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = atob(arr[1]);
    const uint8Array = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i++) {
      uint8Array[i] = data.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mime });
  }

  uploadImages() {
    // console.log('submit called');
    // console.log(
    //   'payload',
    //   this.firstPicture,
    //   this.secondPicture,
    //   this.thirdPicture,
    //   this.label
    // );
    if (this.RuntimeConfig.useMockResponse) {
      this.presentLoading().then((loading) => {
        // Set a delay in milliseconds (e.g., 2000 ms = 2 seconds)
        const delay = 2000;

        setTimeout(() => {
          loading.dismiss();
        }, delay);
      });
    } else {
      // Show the loader

      let formData = new FormData();
      formData.append('Image1', this.dataUrlToBlob(this.firstPicture.dataUrl));
      formData.append('Image2', this.dataUrlToBlob(this.secondPicture.dataUrl));
      formData.append('Image3', this.dataUrlToBlob(this.thirdPicture.dataUrl));
      formData.append('ContributedBy', this.dataService.getData('userId'));
      formData.append('Label', this.label);
      this.presentLoading().then((loading) => {
        this.httpService.post('/data_item', formData).subscribe(
          (response) => {
            // Dismiss the loader
            loading.dismiss();
            // Handle the response
            this.alertService.presentSuccessAlert(response.message);
          },
          (errorResp) => {
            // Dismiss the loader
            loading.dismiss();
            // Handle the error
            console.log(errorResp);
            this.alertService.presentErrorAlertIWithoutButton(errorResp.error);
          }
        );
      });
    }
    // show success msg and refresh the page
    this.firstPicture = {};
    this.secondPicture = {};
    this.thirdPicture = {};
    this.label = null;
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Saving Contribution...',
      // Don't set a duration here since we'll manually dismiss it
    });
    await loading.present();
    return loading;
  }
}
