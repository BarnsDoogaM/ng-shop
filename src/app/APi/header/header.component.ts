import { Component, OnInit } from '@angular/core';
import { productService } from 'src/app/welcome/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  

  constructor(private productService: productService) { }

  filter$ = this.productService.filterAction$;

  ngOnInit(): void {
  }

  doFilter(filter: string){
    this.productService.changeFilter(filter);
  }
}
