import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { HTTPService } from '../http.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DataService } from '../data.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss'],
})
export class DatasetComponent implements OnInit {
  loggedInUser: any = 'Admin';

  displayedColumns: string[] = [
    'number',
    'downloadedBy',
    'labels',
    'downloadDate',
    'dataItemsCount',
    'soldPrice',
    'sold',
  ];
  data: any = [
    {
      id: 1,
      ownerId: 1,
      downloadedBy: `John Doe`,
      downloadDate: new Date(),
      dataItemsCount: 3,
      labels: ['Sofas', 'Chairs'],
      soldPrice: 20,
      soldDate: new Date(),
      sold: true, // it is added on frontend only. It is not expected to be fetched or sent to backend
      number: 0, // for table's indexing purpose only
    },
    {
      id: 1,
      ownerId: 1,
      downloadedBy: `John Doe`,
      downloadDate: new Date(),
      dataItemsCount: 3,
      labels: ['Zindagi', 'Shaadi'],
      soldPrice: 20,
      soldDate: new Date(),
      sold: true, // it is added on frontend only. It is not expected to be fetched or sent to backend
      number: 1, // for table's indexing purpose only
    },
    {
      id: 1,
      ownerId: 1,
      downloadedBy: `John Doe`,
      downloadDate: new Date(),
      dataItemsCount: 3,
      labels: [
        'Sofas',
        'Chairs',
        'Tables',
        'Sofas',
        'Chairs',
        'Tables',
        'Sofas',
        'Chairs',
        'Tables',
        'Sofas',
        'Chairs',
        'Tables',
      ],
      soldPrice: null,
      soldDate: null,
      sold: false, // it is added on frontend only. It is not expected to be fetched or sent to backend
      number: 2, // for table's indexing purpose only
    },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private route: Router,
    private httpService: HTTPService,
    private dialog: MatDialog,
    private dataService: DataService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.fetchDataSets();
  }

  onLogout() {
    this.route.navigate(['login']);
  }

  fetchDataSets() {
    this.httpService.get('/dataset/list').subscribe(
      (response) => {
        console.log(response);
        // filter response where ownerId is equal to userId
        this.data = response.filter(
          (item: any) => item.ownerId === this.dataService.getData('userId')
        );
        // owner name in this.data
        this.data.forEach((item: any) => {
          item.downloadedBy = this.dataService.getData('name');
        });

        this.addNecessaryData();
      },
      (error) => {
        this.alertService.presentAlert(
          'Error',
          'Internal Server Error, Please try again later',
          'OK'
        );
        console.log(error);
      }
    );
  }

  getStringLabels(labels: any) {
    return labels.join(', ');
  }

  async openConfirmationDialog(row: any): Promise<void> {
    if (row.soldPrice !== null) {
      let timeout = setTimeout(async () => {
        try {
          const dialogRef = await this.dialog.open(
            ConfirmationDialogComponent,
            {
              data: { price: row['soldPrice'] },
              disableClose: true, // Prevent closing the dialog by clicking outside or pressing Escape
            }
          );

          dialogRef.afterClosed().subscribe((result) => {
            clearTimeout(timeout);
            // Check the result here (true for Okay, false for Cancel)
            if (!result) {
              // Reset the value to zero or null upon denial
              console.log('user denies');
              row.soldPrice = null;
              row.sold = false;
            } else {
              row.sold = true;
              this.markAsSold(row);
            }
          });
        } catch (error) {
          console.error('Error in confirmation dialog:', error);
        }
      }, 1);
    }
  }

  addNecessaryData() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i]['sold'] = this.data[i]['soldPrice'] ? true : false;
      this.data[i]['number'] = i + 1;
    }
  }

  onHome() {
    this.route.navigate(['home']);
  }
  markAsSold(row: any): void {
    console.log(row);
    this.httpService
      .put('/dataset', {
        labels: row.labels,
        soldPrice: row.soldPrice,
        id: row.id,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.alertService.presentAlert('Success', response.message, 'OK');
        },
        (error) => {
          this.alertService.presentAlert(
            'Error',
            'Internal Server Error, Please try again later',
            'OK'
          );
          console.log(error);
        }
      );
  }
}
