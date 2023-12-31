import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributionsPage } from './contributions.page';

const routes: Routes = [
  {
    path: '',
    component: ContributionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContributionsPageRoutingModule {}
