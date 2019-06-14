import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ICategory} from '../../../models/interfaces/icategory';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: ICategory[];
  @Output() eventEmitter = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getDataArray().subscribe(
      (data = []) => {
        this.categories = data;
      }
    );
  }

  filterProducts(id: number) {
    console.log('Filtering the categories to show movies with the category ' + id);
    this.eventEmitter.emit(id);
  }
}
