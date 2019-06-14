import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../models/interfaces/iproduct';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  relatedMovies: IProduct[];
  categories: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getMovie();
    this.route.paramMap.subscribe(() => {
      this.getMovie();
    });
  }

  getMovie() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.productService.getData(Number(id)).subscribe(
      (data) => {
        this.product = data;
        this.getRelatedMovies();
        this.getCategoryForId(data.productCategory[0].categoryId);
      }
    );
  }

  // Get three random movies to show as "related movies"
  getRelatedMovies() {
    this.productService.getDataArray().subscribe(
      (data = []) => {
        this.relatedMovies = data
          .filter(movie => movie.id !== this.product.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
      }
    );
  }

  addProductToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  getCategoryForId(id: number) {
    this.categoryService.getData(id).subscribe((category) => {
      this.categories = category.name;
    });
  }
}
