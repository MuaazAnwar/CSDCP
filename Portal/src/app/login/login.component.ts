import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HTTPService } from '../http.service';
import { DataService } from '../data.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private httpService: HTTPService,
    private dataService: DataService,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  ngOnInit() {}

  onLogin() {
    if (
      this.loginForm.controls['username'].value &&
      this.loginForm.controls['password'].value
    ) {
      this.httpService
        .post('/login?login_type=portal', {
          username: this.loginForm.controls['username'].value,
          password: this.loginForm.controls['password'].value,
        })
        .subscribe(
          (response) => {
            console.log(response);
            this.dataService.addData('userId', response.userId);
            this.dataService.addData('name', response.name);
            this.dataService.addData('userName', response.userName);
            this.route.navigate(['home']);
          },
          (error) => {
            console.log('error recivied', error);
            this.alertService.presentAlert('Error', error.statusText, 'OK');
          }
        );
    }
  }
}
