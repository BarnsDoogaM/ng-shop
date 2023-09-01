import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subject, catchError } from 'rxjs';
import { productService } from 'src/app/welcome/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

 
  private erorrMessageSubject = new Subject<string>();
  errorMessage$ = this.erorrMessageSubject.asObservable();

  constructor(private productService: productService, private router: Router, private route: ActivatedRoute) { }

  
  product$ = this.productService.product$.pipe(
    catchError(err => {
      this.erorrMessageSubject.next(err);
      return EMPTY;
    })
    )

  ngOnInit(): void {

    const params = this.route.snapshot.paramMap.get('id');

    if(params){
      this.productService.selectedProductChanged(+params);
    }
  }

  onBack(){
    this.router.navigate(['/welcome'])
  }

}
