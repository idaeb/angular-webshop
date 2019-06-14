import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {IProduct} from '../../models/interfaces/iproduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: IProduct[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getDataArray().subscribe(
      (data = []) => {
        this.products = data;
      }
    );
  }

  filterProducts(id: number) {
    console.log('Reacts to filtering products with id ' + id);
    this.getFilteredProducts(id);
  }

  getFilteredProducts(filterCategoryId: number) {
    this.productService.getDataArray().subscribe(
      (data = []) => {
        this.products = data.filter(product => {
          return product.productCategory.some(category => category.categoryId === filterCategoryId);
        });
      }
    );
  }
}
