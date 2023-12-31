import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributionsPageRoutingModule } from './contributions-routing.module';

import { ContributionsPage } from './contributions.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributionsPageRoutingModule
  ],
  declarations: [ContributionsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContributionsPageModule {}
