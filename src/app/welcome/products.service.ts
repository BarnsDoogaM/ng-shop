import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { Product } from './products';
import { BehaviorSubject, Observable, Subject, catchError, delay, filter, shareReplay, switchMap, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class productService{
    private productsUrl = 'https://fakestoreapi.com/products';

    constructor(private http: HttpClient){}

    
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoadingAction$ = this.isLoadingSubject.asObservable();
  

    products$ = this.http.get<Product[]>(this.productsUrl).pipe(
      
        tap(() => this.isLoadingSubject.next(true)),
        delay(3000),
        tap(data => console.log('products', JSON.stringify(data))),
        catchError(this.handleError),
        tap(() => this.isLoadingSubject.next(false)),
        shareReplay(1)
    );

   
    private productSelectedSubject = new BehaviorSubject<number>(0);
    productSelectedAction$ = this.productSelectedSubject.asObservable();
  
    product$ = this.productSelectedAction$
      .pipe(
        filter(id => !!id),
        switchMap(selectedProductId =>
          this.http.get<Product>(`${this.productsUrl}/${selectedProductId}`)
            .pipe(
              tap(response => console.log(JSON.stringify(response))),
              catchError(this.handleError)
            )
        ));

    selectedProductChanged(selecteProduct: number): void{
        this.productSelectedSubject.next(selecteProduct);
    }


    private handleError(err: any): Observable<never>{
        let errorMessage: string;

        if(err.error instanceof ErrorEvent){
            let errorMessage = `an error occurred ${err.message.error}`;
        }else{
            let errorMessage = ` Backend returned code ${err.status} : ${err.body.error}`
        }
        return throwError(() => errorMessage);
    }

}