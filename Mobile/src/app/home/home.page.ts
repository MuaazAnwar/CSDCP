import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private dataService: DataService, private router: Router) {
    console.log('home loaded');
  }

  goToUploadImage() {
    this.router.navigate(['/upload-image']);
  }

  goToVerifyImage() {
    this.router.navigate(['/verify-image']);
  }
}
