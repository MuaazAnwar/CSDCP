import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyImagePage } from './verify-image.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyImagePageRoutingModule {}
