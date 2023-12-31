import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HTTPService } from 'src/services/http.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/services/alert.service';
import { RuntimeConfigService } from 'src/services/config.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-verify-image',
  templateUrl: './verify-image.page.html',
  styleUrls: ['./verify-image.page.scss'],
})
export class VerifyImagePage implements OnInit {
  dataitems = [
    {
      imageLink1:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink2:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      imageLink3: 'https://docs-demo.ionic.io/assets/madison.jpg',
      id: '1',
    },
    {
      imageLink3:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink2:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      id: '2',
    },
  ];

  dataitem: any = { imageLink1: '', imageLink2: '', imageLink3: '', id: '' };
  hasNextOffset: boolean = true;
  labelsList: any = [];
  label: any = null;
  reportedIssuesList: any = [
    { name: 'Image is Unclear', id: 'unclear' }, // The image is blurry or details are not visible.
    { name: 'Image Violates Privacy', id: 'privacy' }, // The image contains personal or sensitive information.
    //{ name: 'Image is Irrelevant', id: 'irrelevant' }, // The image does not match the required content criteria.
    { name: 'Image is Inappropriate', id: 'inappropriate' }, // The image contains inappropriate or offensive content.
    { name: 'Image Contains Copyrighted Material', id: 'copyright' }, // The image contains copyrighted material.
    { name: 'Image has Poor Lighting', id: 'poor_lighting' }, // The image is too dark or overexposed.
    { name: 'Other Image Issue', id: 'other' }, // For reasons not listed above.
  ];
  issue: any = null;
  issueDetails: string = null;
  currentOffset: number = 0;
  constructor(
    public menu: MenuController,
    private httpService: HTTPService,
    private alertService: AlertService,
    private dataService: DataService,
    private RuntimeConfig: RuntimeConfigService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    //   this.fetchLabelsList();
    //   this.fetchDataItem();
  }

  ionViewWillEnter() {
    this.menu.close();
    this.fetchLabelsList();
    this.fetchDataItem();
  }

  public fetchLabelsList() {
    if (this.RuntimeConfig.useMockResponse) {
      this.labelsList.push({
        labelId: '1',
        labelName: 'Sofas',
      });
      this.labelsList.push({
        labelId: '2',
        labelName: 'Chairs',
      });
      this.labelsList.push({
        labelId: '3',
        labelName: 'Tables',
      });
      this.labelsList.push({
        labelId: '4',
        labelName: 'Beds',
      });
      this.labelsList.push({
        labelId: '5',
        labelName: 'Desks',
      });
      this.labelsList.push({
        labelId: '6',
        labelName: 'Dressers',
      });
      this.labelsList.push({
        labelId: '7',
        labelName: 'Benches',
      });
      this.labelsList.push({
        labelId: '8',
        labelName: 'Stools',
      });
      this.labelsList.push({
        labelId: '9',
        labelName: 'Bookcases',
      });
      this.labelsList.push({
        labelId: '10',
        labelName: 'Nightstands',
      });
      this.labelsList.push({
        labelId: '11',
        labelName: 'Futons',
      });
      this.labelsList.push({
        labelId: '12',
        labelName: 'Couches',
      });
      this.labelsList.push({
        labelId: '13',
        labelName: 'Loveseats',
      });
      this.labelsList.push({
        labelId: '14',
        labelName: 'Ottomans',
      });
      this.labelsList.push({
        labelId: '15',
        labelName: 'Cabinets',
      });
      this.labelsList.push({
        labelId: '16',
        labelName: 'Shelves',
      });
      this.labelsList.push({
        labelId: '17',
        labelName: 'TV Stands',
      });
      this.labelsList.push({
        labelId: '18',
        labelName: 'Mirrors',
      });
      this.labelsList.push({
        labelId: '19',
        labelName: 'Rugs',
      });
      this.labelsList.push({
        labelId: '20',
        labelName: 'Lamps',
      });
      this.labelsList.push({
        labelId: '21',
        labelName: 'Pillows',
      });
    } else {
      this.httpService.get('/data_label/list').subscribe(
        (response) => {
          console.log(response);
          this.labelsList = response;
          // Assign LabelsList to the response
        },
        (error) => {
          console.log(error);
          this.alertService.presentErrorAlertIWithoutButton(error.message);
        }
      );
    }
  }

  public fetchDataItem() {
    if (this.RuntimeConfig.useMockResponse) {
      this.dataitem = this.dataitems[this.currentOffset];
      this.hasNextOffset = this.currentOffset < this.dataitems.length - 1;
      // set default value for dataitem to avoid null pointer exception
      if (!this.dataitem) {
        this.dataitem = {
          imageLink1: null,
          imageLink2: null,
          imageLink3: null,
          id: null,
        };
        this.alertService.presentErrorAlert('No more data items to verify!');
        this.labelsList = null;
        this.reportedIssuesList = [];
      }
    } else {
      let userId = this.dataService.getData('userId');
      this.httpService
        .get(`/data_item/?currentUserId=${userId}&offset=${this.currentOffset}`)
        .subscribe(
          (response) => {
            console.log(response);
            this.dataitem = response;
            // recall the function to fetch the next item by offset+1
            this.httpService
              .get(
                `/data_item/?currentUserId=${userId}&offset=${
                  this.currentOffset + 1
                }`
              )
              .subscribe(
                (response) => {
                  console.log(response);
                  // if response has valid id
                  if (response.id > 0) {
                    this.hasNextOffset = true;
                  }
                },
                (error) => {
                  console.log(
                    'unable to fetch next offest status due to error',
                    error
                  );
                  this.hasNextOffset = false;
                }
              );
          },
          (errorResp) => {
            console.log(errorResp);
            this.alertService.presentErrorAlertIWithoutButton(errorResp.error);
            this.hasNextOffset = false;
            this.dataitem = {
              imageLink1: null,
              imageLink2: null,
              imageLink3: null,
              id: null,
            };
            this.labelsList = null;
            this.reportedIssuesList = [];
          }
        );
    }
  }
  public fetchPrevItem() {
    // update the currentOffset
    this.currentOffset -= 1;
    this.fetchDataItem();
  }
  public fetchNextItem() {
    // update the currentOffset
    this.currentOffset += 1;
    this.fetchDataItem();
  }
  public submitDetails() {
    if (this.RuntimeConfig.useMockResponse) {
      this.presentLoading().then((loading) => {
        // Set a delay in milliseconds (e.g., 2000 ms = 2 seconds)
        const delay = 2000;

        setTimeout(() => {
          loading.dismiss();
        }, delay);
      });
      this.alertService.presentSuccessAlert('Details submitted successfully!');
      // delete dataitem from dataitems of currentOffset
      this.dataitems.splice(this.currentOffset, 1);
      this.currentOffset = 0;
      this.label = null;
      this.issue = null;
      this.issueDetails = null;
      this.fetchDataItem();
    } else {
      let body = {
        dataItem: this.dataitem.id,
        reviewedBy: this.dataService.getData('userId'),
        label: this.label,
        reportedIssueType: this.issue,
        issueDetails: this.issueDetails,
      };
      this.presentLoading().then((loading) => {
        this.httpService.post('/data_item/review', body).subscribe(
          (response) => {
            // Dismiss the loader
            loading.dismiss();
            // Handle the response
            console.log(response);
            this.alertService.presentSuccessAlert(response.message);
            this.currentOffset = 0;
            this.label = null;
            this.issue = null;
            this.issueDetails = null;
            this.fetchDataItem();
          },
          (error) => {
            // Dismiss the loader
            loading.dismiss();
            // Handle the error
            console.log(error);
            this.alertService.presentErrorAlertIWithoutButton(error.message);
          }
        );
      });
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Saving Feedback...',
      // Don't set a duration here since we'll manually dismiss it
    });
    await loading.present();
    return loading;
  }
}
