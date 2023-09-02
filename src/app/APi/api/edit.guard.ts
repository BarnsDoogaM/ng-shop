import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentComponent } from './payment/payment.component';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<PaymentComponent> {
  
  canDeactivate(
    component: PaymentComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

      // if(component.isDirty){
      //   const title
      // }
    return true;


  }
  
}
