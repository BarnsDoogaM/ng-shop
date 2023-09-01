import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  addToCart: boolean = true;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  addCart() {
    this.addToCart = !this.addToCart;
    this.route.navigate(['/APi/payment'])
  }

}
