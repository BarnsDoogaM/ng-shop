import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APiRoutingModule } from './api-routing.module';
import { APiComponent } from './api.component';
import { DetailsComponent } from './details/details.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    APiComponent,
    DetailsComponent,
    PaymentComponent,
    CheckoutComponent,
  
   
  ],
  imports: [
    CommonModule,
    APiRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    PaymentComponent,
    CheckoutComponent,
   
  ]
})
export class APiModule { }
