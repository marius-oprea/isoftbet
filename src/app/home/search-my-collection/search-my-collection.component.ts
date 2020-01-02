import { Component, AfterViewInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SearchMyCollectionService } from './search-my-collection.service';
import { tap, filter, map, last, switchMap } from 'rxjs/operators';
import { MyCollectionService } from 'src/app/my-collection/my-collection.service';

@Component({
  templateUrl: './search-my-collection.component.html',
  styleUrls: ['./search-my-collection.component.scss'],
  selector: 'app-search-my-collection'
})
export class SearchMyCollectionComponent implements AfterViewInit {
  @Input() term: Subject<any>;
  data$: Observable<any>;
  totalRecords$: BehaviorSubject<any>;

  constructor(
    private searchMyCollectionService: SearchMyCollectionService,
    private myCollectionService: MyCollectionService
    ) {
    this.totalRecords$ = new BehaviorSubject<any>(0);
  }

  ngAfterViewInit() {
    const ids = this.myCollectionService.getAllImagesIDs().toString();

    // this MY COLLECTION filter doesn't work yet
    this.data$ = this.searchMyCollectionService.search(this.term, ids)
    .pipe(
      filter(r => r.data.filter( f => f.slug.search('glob') !== -1)),
      tap((r: any) => {
        if (r && r.pagination) {
          this.totalRecords$.next(r.pagination.total_count);
        }
      })
    );
  }

  onPageChange(event) {
    const offset = event.itemsPerPage * event.page - event.itemsPerPage;
    const ids = this.myCollectionService.getAllImagesIDs().toString();
    this.data$ = this.searchMyCollectionService.searchEntries(this.term, ids, event.itemsPerPage, offset);
  }
}
