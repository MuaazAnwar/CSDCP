import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HTTPService } from '../http.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertService } from '../alert.service';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: any = 'Admin';
  allContributions: any = [];
  filteredContributions: any = [];
  customOptions: OwlOptions = {
    // for carousel
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsive: {
      0: {
        items: 1,
      },
      800: {
        items: 2,
      },
      1600: {
        items: 3,
      },
    },
  };
  labelsList = [
    {
      id: 0,
      labelName: 'All',
    },
    {
      id: 1,
      labelName: 'Pizza',
    },
    {
      id: 2,
      labelName: 'Burger',
    },
    {
      id: 2,
      labelName: 'Sofas',
    },
  ];
  //selectedLabelName: any = 'All';
  selectedLabels: string[] = [];
  // selectedLLabelId: any = 0;
  constructor(
    private httpService: HTTPService,
    private route: Router,
    private dataService: DataService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    // Fetch Labels List
    this.fetchLabelsList();

    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Sofas',
      imageLink1: 'https://csdgp-bucket.s3.us-west-2.amazonaws.com/image1.webp',
      imageLink2: 'https://csdgp-bucket.s3.us-west-2.amazonaws.com/image2.webp',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'John',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '3',
      usersReviewedCount: '4',
    });
    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Sofas',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      imageLink2:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'Muaaz',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '10',
      usersReviewedCount: '6',
    });

    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Sofas',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      imageLink2:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'Muaaz',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '10',
      usersReviewedCount: '6',
    });

    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Burger',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      imageLink2:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'Muaaz',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '10',
      usersReviewedCount: '6',
    });

    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Sofas',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      imageLink2:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'Muaaz',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '10',
      usersReviewedCount: '6',
    });

    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Pizza',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      imageLink2:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'Muaaz',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '10',
      usersReviewedCount: '6',
    });

    this.allContributions.push({
      dataItemId: '1',
      assignedLabel: 'Pizza',
      imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
      imageLink2:
        'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
      imageLink3:
        'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
      contributionBy: 'Muaaz',
      contributionDate: '2023-10-07T18:07:52:59',
      matchingLabelReviewsCount: '10',
      usersReviewedCount: '6',
    });
    this.filteredContributions = this.allContributions;
    // Fetch contributions
    this.fetchContributions();
  }

  public fetchLabelsList() {
    this.httpService.get('/data_label/list').subscribe(
      (response) => {
        console.log(response);
        this.labelsList = response;
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

  public fetchContributions() {
    this.httpService.get('/data_item/list').subscribe(
      (response) => {
        console.log(response);
        this.filteredContributions = response;
        this.allContributions = response;
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

  labelSelected(selectedLabels: any[]) {
    // If no labels are selected, show all contributions
    if (selectedLabels.length === 0) {
      this.filteredContributions = this.allContributions;
    } else {
      // Filter contributions based on selected labels
      this.filteredContributions = this.allContributions.filter(
        (contribution: any) =>
          selectedLabels.includes(contribution.assignedLabel)
      );
    }
  }

  exportexcel(): void {
    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.filteredContributions
    );
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'ExportExcel.xlsx');
  }

  downloadData(): void {
    // if selected labels are 0 then return error
    if (this.selectedLabels.length === 0) {
      this.alertService.presentAlert(
        'Error',
        "Please select filter, all data can't be downloaded in single dataset",
        'OK'
      );
      return;
    }
    // add image links to array
    let imageLinks: any[] = [];
    this.filteredContributions.forEach((contribution: any) => {
      imageLinks.push(contribution.imageLink1);
      imageLinks.push(contribution.imageLink2);
      imageLinks.push(contribution.imageLink3);
    });
    if (imageLinks.length === 0) {
      this.alertService.presentAlert(
        'Error',
        'No images found for selected labels',
        'OK'
      );
      return;
    }
    // infrom server that data is downloaded
    this.downloadDataset();
    // download images
    this.downloadImages(imageLinks);
  }

  onLogout() {
    this.route.navigate(['login']);
  }

  public downloadDataset() {
    this.httpService
      .post('/dataset', {
        Labels: this.selectedLabels,
        OwnerId: this.dataService.getData('userId'),
      })
      .subscribe(
        (response) => {
          console.log(response);
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
  async downloadImages(imageLinks: string[]): Promise<void> {
    const jsZip = new JSZip();

    for (const link of imageLinks) {
      try {
        const response = await fetch(link);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const blob = await response.blob();
        const filename = this.extractFilename(link); // Extracts filename from URL
        jsZip.file(filename, blob);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }

    // Generate ZIP file and trigger download
    jsZip.generateAsync({ type: 'blob' }).then((zipContent) => {
      const url = window.URL.createObjectURL(zipContent);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }

  extractFilename(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }
  onDatasets() {
    this.route.navigate(['dataset']);
  }
}
