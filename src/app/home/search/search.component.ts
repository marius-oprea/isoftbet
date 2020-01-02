import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SearchService } from 'src/app/home/search/search.service';
import { take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  selector: 'app-search'
})
export class SearchComponent implements AfterViewInit {
  @Input() term;
  data$: Observable<any>;
  totalRecords$: BehaviorSubject<any>;

  constructor(private searchService: SearchService) {
    this.totalRecords$ = new BehaviorSubject<any>(0);
  }

  ngAfterViewInit() {
    this.data$ = this.searchService.search(this.term)
    .pipe(
      tap((r: any) => {
        if (r && r.pagination) {
          this.totalRecords$.next(r.pagination.total_count);
        }
      })
    );
  }

  onPageChange(event) {
    const offset = event.itemsPerPage * event.page - event.itemsPerPage;
    this.data$ = this.searchService.searchEntries(this.term, event.itemsPerPage, offset);
  }
}
