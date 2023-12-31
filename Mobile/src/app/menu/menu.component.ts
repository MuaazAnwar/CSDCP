import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
// export class MenuComponent {
//   user: { name?: string; rating?: string | number; earnings?: number };

//   constructor(private router: Router, private dataService: DataService) {
//     this.user = {};

//     const userName = this.dataService.getData('name');
//     if (userName) {
//       this.user.name = userName;
//     }

//     const userRating = this.dataService.getData('rating');
//     this.user.rating =
//       userRating !== null && userRating !== 0 ? userRating : 'N/A';

//     const userContributions = this.dataService.getData('contributions');
//     if (userContributions) {
//       this.user.earnings = userContributions;
//     }
//     console.log('user', this.user);
//   }

//   ionViewDidEnter() {
//     this.user.name = this.dataService.getData('name');
//     this.user.rating =
//       this.dataService.getData('rating') !== null &&
//       this.dataService.getData('rating') !== 0
//         ? this.dataService.getData('rating')
//         : 'N/A';
//     this.user.earnings = this.dataService.getData('contributions');
//     console.log('user', this.user);
//   }

//   onLogout() {
//     this.router.navigate(['/login']);
//   }

//   goToContributions() {
//     this.router.navigate(['/contributions']);
//   }

//   goToUploadImage() {
//     this.router.navigate(['/upload-image']);
//   }

//   goToVerifyImage() {
//     this.router.navigate(['/verify-image']);
//   }
// }
export class MenuComponent implements OnDestroy {
  user: { name?: string; rating?: string | number; earnings?: number };
  private routerSubscription: Subscription;

  constructor(private router: Router, private dataService: DataService) {
    this.user = {};

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  loadData() {
    // Implement your data loading logic here
    this.user.name = this.dataService.getData('name');
    this.user.rating =
      this.dataService.getData('rating') !== null &&
      this.dataService.getData('rating') !== 0
        ? this.dataService.getData('rating')
        : 'N/A';
    this.user.earnings = this.dataService.getData('earnings');
    console.log('user', this.user);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  onLogout() {
    this.router.navigate(['/login']);
  }

  goToContributions() {
    this.router.navigate(['/contributions']);
  }

  goToUploadImage() {
    this.router.navigate(['/upload-image']);
  }

  goToVerifyImage() {
    this.router.navigate(['/verify-image']);
  }
}
