import {Component, OnInit} from '@angular/core';
import {IProduct} from '../../models/interfaces/iproduct';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: IProduct[];
  searchString: string;

  constructor(private route: ActivatedRoute, private searchService: SearchService) {
  }

  ngOnInit() {
    // Listen to changes on the searchString in the url and fetch search results after it changes
    // This works around the component not initializing more than once on the same endpoint
    this.route.queryParamMap.subscribe(params => {
      this.searchString = params.get('searchString');
      this.getSearchResults();
    });
  }

  getSearchResults() {
    this.searchService.getSearchResult(this.searchString).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
