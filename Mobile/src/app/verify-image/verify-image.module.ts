import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyImagePageRoutingModule } from './verify-image-routing.module';

import { VerifyImagePage } from './verify-image.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyImagePageRoutingModule
  ],
  declarations: [VerifyImagePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VerifyImagePageModule {}
