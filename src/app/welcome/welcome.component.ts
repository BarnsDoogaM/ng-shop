import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { productService } from './products.service';
import { EMPTY, Observable, Subject, catchError, combineLatest, map } from 'rxjs';
import { Product } from './products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  hide = false;
  pageSize = this.productService.pageSizes;
  selectedButton = 5;

  constructor(private productService: productService, private route: ActivatedRoute) { }

  private erorrMessageSubject = new Subject<string>();
  errorMessage$ = this.erorrMessageSubject.asObservable();

  filter$ = this.productService.filterAction$;
  totalPages$ = this.productService.totalPages$;
  currentPage$ = this.productService.currentPage$;
  pageSize$ = this.productService.pageSizeAction$;

  // Whether to disable the next/prev
  disablePrevious$: Observable<boolean> = this.currentPage$
    .pipe(
      map(pageNumber => pageNumber === 1)
    );

  // Whether to disable the next/prev
  disableNext$: Observable<boolean> = combineLatest([
    this.currentPage$,
    this.totalPages$
  ]).pipe(
    map(([currentPage, totalPages]) => currentPage === totalPages)
  );

  products$ = this.productService.allproducts$
    .pipe(
      catchError(err => {
        this.erorrMessageSubject.next(err);
        return EMPTY;
      })
    )

  isLoading$ = this.productService.isLoadingAction$;

  totalFiltered$ = this.productService.totalFiltered$;

  vm$ = combineLatest([
    this.filter$,
    this.pageSize$,
    this.totalPages$,
    this.currentPage$,
    this.totalFiltered$,
    this.products$,
  ]).pipe(
    map(([filter, pageSize, totalPages, currentPage, totalFiltered, products]:
      [string, number, number, number, number, Product[]]) => ({
        filter,
        pageSize,
        totalPages,
        currentPage,
        totalFiltered,
        products
      }))
  );

  ngOnInit(): void {
   
  }

  setPage(amount: number): void {
    this.productService.incrementPage(amount);
  }

  setPageSize(pageSize: number): void {
    this.selectedButton = pageSize;
    this.productService.changePageSize(pageSize);
  }

  onHide() {
    this.hide = !this.hide
  }

}
