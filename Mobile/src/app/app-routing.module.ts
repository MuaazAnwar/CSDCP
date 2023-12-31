import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'contributions',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./contributions/contributions.module').then(
        (m) => m.ContributionsPageModule
      ),
  },
  {
    path: 'upload-image',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./upload-image/upload-image.module').then(
        (m) => m.UploadImagePageModule
      ),
  },
  {
    path: 'verify-image',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./verify-image/verify-image.module').then(
        (m) => m.VerifyImagePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
