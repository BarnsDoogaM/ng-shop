import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/welcome/products';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  postForm: FormGroup;


  constructor(private fb: FormBuilder) { }






  ngOnInit(): void {
    this.postForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
      OrderSummary: ['', [Validators.required, Validators.minLength(17)]],
      shippingAddress: ['', [Validators.required, Validators.minLength(50)]],
      expiryDate: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  save() {
    console.log(this.postForm.value);
  }
}
