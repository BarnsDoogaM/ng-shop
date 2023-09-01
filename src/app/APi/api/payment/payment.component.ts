import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      cvv: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

}
