import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CopomexPageRoutingModule } from './copomex-routing.module';

import { CopomexPage } from './copomex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
    CopomexPageRoutingModule
  ],
  declarations: [CopomexPage]
})
export class CopomexPageModule {}
