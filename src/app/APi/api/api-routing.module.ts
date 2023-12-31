import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APiComponent } from './api.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  { path: '', component: APiComponent },
  {path: 'products/:id', component: DetailsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class APiRoutingModule { }
