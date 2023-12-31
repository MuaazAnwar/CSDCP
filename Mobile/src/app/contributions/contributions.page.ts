import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HTTPService } from 'src/services/http.service';
import { AlertService } from 'src/services/alert.service';
import { DataService } from 'src/services/data.service';
import { RuntimeConfigService } from 'src/services/config.service';

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.page.html',
  styleUrls: ['./contributions.page.scss'],
})
export class ContributionsPage implements OnInit {
  contributions: any = [];
  searchTerm: any;
  searchResults: any;
  constructor(
    public menu: MenuController,
    private httpServer: HTTPService,
    private dataService: DataService,
    private alertService: AlertService,
    private RuntimeConfig: RuntimeConfigService
  ) {}

  ngOnInit() {
    //   this.populateContributions();
  }

  ionViewWillEnter() {
    this.menu.close();
    this.populateContributions();
  }

  populateContributions() {
    if (this.RuntimeConfig.useMockResponse) {
      this.contributions.push({
        dataItemId: '1',
        assignedLabel: 'Sofas',
        uploadedDate: '2023-10-07T18:07:52:59',
        imageLink1:
          'https://csdgp-bucket.s3.us-west-2.amazonaws.com/image1.webp',
        imageLink2:
          'https://csdgp-bucket.s3.us-west-2.amazonaws.com/image2.webp',
        imageLink3:
          'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
        contributionType: 'Contributor',
        userId: '1',
        rating: '0.0',
        earning: '0.00',
      });
      this.contributions.push({
        dataItemId: '1',
        assignedLabel: 'Chairs',
        uploadedDate: '2023-10-07T18:07:52:59',
        imageLink1: 'https://docs-demo.ionic.io/assets/madison.jpg',
        imageLink2:
          'https://media.istockphoto.com/id/1422644298/photo/hands-picking-pizza-slices.jpg?s=1024x1024&w=is&k=20&c=KHx-xvl2JAXdWEouQVZsKOlFs2Gk25dYlTQhUqCZjr8=',
        imageLink3:
          'https://media.istockphoto.com/id/1490258074/photo/colleagues-having-lunch-at-pizza-party-and-eating-assorted-pizzas-and-drinking-red-wine-on.jpg?s=1024x1024&w=is&k=20&c=p4EDVhZ6W3LcQ50rtbd97QYhfy7NtX2uyJLP4nUUrx8=',
        contributionType: 'Contributor',
        userId: '1',
        rating: '0.0',
        earning: '0.00',
      });
    } else {
      // call http request to fetch contributions
      let userId = this.dataService.getData('userId');
      this.httpServer.get('/user_contributions/?user_id=' + userId).subscribe(
        (response) => {
          this.contributions = response;
        },
        (error) => {
          console.log('error', error);
          this.alertService.presentErrorAlertIWithoutButton(error.message);
        }
      );
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.populateContributions();
    } else {
      this.contributions = this.contributions.filter((item) =>
        ['assignedLabel', 'rating', 'earning', 'contributionType'].some(
          (prop) => item[prop].toLowerCase().includes(query)
        )
      );
    }
  }

  resetInput() {
    console.log('Reset called');
    this.populateContributions();
  }
}
