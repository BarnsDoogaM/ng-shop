import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Product } from './products';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, delay, filter, map, scan, shareReplay, switchMap, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class productService {
    private productsUrl = 'https://fakestoreapi.com/products';

    pageSizes = [2, 3, 5];

    constructor(private http: HttpClient) { }

    private filterSubject = new BehaviorSubject<string>('');
    filterAction$ = this.filterSubject.asObservable();

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoadingAction$ = this.isLoadingSubject.asObservable();

    private pageSizeSubject = new BehaviorSubject<number>(this.pageSizes[0]);
    pageSizeAction$ = this.pageSizeSubject.asObservable();

    private pageNumberSubject = new BehaviorSubject<number>(0);


    products$ = this.http.get<Product[]>(this.productsUrl).pipe(

        tap(() => this.isLoadingSubject.next(true)),
        delay(3000),
        tap(data => console.log('products', JSON.stringify(data))),
        catchError(this.handleError),
        tap(() => this.isLoadingSubject.next(false)),
        shareReplay(1)
    );


    filteredProducts$ = combineLatest([
        this.products$,
        this.filterAction$
    ]).pipe(map(([products, filterBy]) => this.performFilter(products, filterBy)))


    totalFiltered$ = this.filteredProducts$.pipe(
        map(products => products.length)
    )

    totalPages$ = combineLatest([
        this.totalFiltered$,
        this.pageSizeAction$
    ])
        .pipe(
            map(([total, pageSize]) =>
                Math.ceil(total / pageSize))
        );



    currentPage$ = this.pageNumberSubject
        .pipe(
            scan((acc, one) => {
                if (one === 0) {
                    return 1;
                }
                else {
                    return acc + one;
                }
            })
        );

    allproducts$ = combineLatest([
        this.filteredProducts$,
        this.currentPage$,
        this.pageSizeAction$
    ])
        .pipe(
            // Perform the filtering
            map(([filteredProducts, pageNumber, pageSize]) =>
                filteredProducts.slice((pageNumber - 1) * pageSize,
                    pageNumber * pageSize)
            )
        );

    changePageSize(size: number): void {
        this.pageSizeSubject.next(size);
        // When the page size changes, reset the page number.
        this.incrementPage(0);
    }
    // Increment/decrement the current page
    // Pass 0 to re-initialize the page
    incrementPage(amount: number): void {
        this.pageNumberSubject.next(amount);
    }

    private productSelectedSubject = new BehaviorSubject<number>(0);
    productSelectedAction$ = this.productSelectedSubject.asObservable();

    product$ = this.productSelectedAction$
        .pipe(
            filter(id => !!id),
            switchMap(selectedProductId =>
                this.http.get<Product>(`${this.productsUrl}/${selectedProductId}`)
                    .pipe(
                        tap(() => this.isLoadingSubject.next(true)),
                        tap(response => console.log(JSON.stringify(response))),
                        catchError(this.handleError),
                        shareReplay(1),
                        tap(() => this.isLoadingSubject.next(false))
                    )


            ));

    selectedProductChanged(selecteProduct: number): void {
        this.productSelectedSubject.next(selecteProduct);
    }

    changeFilter(filterBy: string): void {
        this.filterSubject.next(filterBy);

        this.incrementPage(0);
    }


    performFilter(products: Product[], filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return products.filter((product: Product) =>
            product.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }


    private handleError(err: any): Observable<never> {
        let errorMessage: string;

        if (err.error instanceof ErrorEvent) {
            let errorMessage = `an error occurred ${err.message.error}`;
        } else {
            let errorMessage = ` Backend returned code ${err.status} : ${err.body.error}`
        }
        return throwError(() => errorMessage);
    }

}