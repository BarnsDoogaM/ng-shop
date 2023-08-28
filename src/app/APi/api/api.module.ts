import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APiRoutingModule } from './api-routing.module';
import { APiComponent } from './api.component';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    APiComponent,
    DetailsComponent,
    PaymentComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    APiRoutingModule
  ],
  exports: [
    PaymentComponent,
    CheckoutComponent
  ]
})
export class APiModule { }
