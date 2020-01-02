import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TrendingService } from './trending.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  selector: 'app-trending',
  providers: [TrendingService]
})
export class TrendingComponent implements OnInit, AfterViewInit {
  data$: Observable<any>;
  totalRecords$: BehaviorSubject<any>;
  currentPage: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private trendingService: TrendingService) {

    this.totalRecords$ = new BehaviorSubject<any>(0);
  }

  ngOnInit() {
    this.data$ = this.trendingService.getTrendingResult()
      .pipe(
        tap(r => {
          if (r && r.pagination) {
            this.totalRecords$.next(r.pagination.total_count);
          }
        })
      );
  }

  ngAfterViewInit() {
/*    this.data$ = this.trendingService.getTrendingResult()
      .pipe(
        tap(r => {
          if (r && r.pagination) {
            this.totalRecords$.next(r.pagination.total_count);
          }
        })
      );
*/
  }

  onPageChange(event) {
    const offset = event.itemsPerPage * event.page - event.itemsPerPage;
    this.data$ = this.trendingService.getTrendingResult(event.itemsPerPage, offset);
  }
}
