import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productService } from 'src/app/welcome/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  constructor(private productService: productService, private route: ActivatedRoute) { }

  filter$ = this.productService.filterAction$;

  ngOnInit(): void {
    // this.filter$ = this.route.snapshot.queryParamMap.get('filterBy') || '';
  }

  doFilter(filter: string) {
    this.productService.changeFilter(filter);
  }
}
