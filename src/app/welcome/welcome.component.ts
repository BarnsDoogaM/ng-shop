import { Component, OnInit } from '@angular/core';
import { productService } from './products.service';
import { EMPTY, Subject, catchError } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

 
  constructor(private productService: productService) { }

  private erorrMessageSubject = new Subject<string>();
  errorMessage$ = this.erorrMessageSubject.asObservable();


  products$ = this.productService.products$
  .pipe(
    catchError(err => {
      this.erorrMessageSubject.next(err);
      return EMPTY;
    })
  )

  

  ngOnInit(): void {
  }

  interveiew(){
    console.log("interview");
  }

 

}
