import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APiRoutingModule } from './api-routing.module';
import { APiComponent } from './api.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    APiComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    APiRoutingModule
  ]
})
export class APiModule { }
