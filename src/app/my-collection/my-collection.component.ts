import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MyCollectionService } from './my-collection.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SearchService } from '../home/search/search.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
  selector: 'app-my-collection'
})
export class MyCollectionComponent implements OnInit, AfterViewInit {
  data$: Observable<any>;
  totalRecords$: BehaviorSubject<any>;
  searchTerm$: Subject<string>;

  constructor(private myCollectionService: MyCollectionService, private searchService: SearchService, private router: Router) {
    this.totalRecords$ = new BehaviorSubject<any>(0);

    this.searchTerm$ = new Subject<string>();
  }

  ngOnInit() {
    this.data$ = this.myCollectionService.getImages(this.myCollectionService.getAllImagesIDs().toString())
    .pipe(
      tap(r => {
        if (r && r.pagination) {
          this.totalRecords$.next(r.pagination.total_count);
        }
      })
    );
  }

  ngAfterViewInit() {
/*
    this.data$ = this.myCollectionService.getImages(this.myCollectionService.getAllImagesIDs().toString())
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
  }

  onHome() {
    this.router.navigate(['']);
    this.router.navigate(['']);
  }

  onUpload() {
    this.router.navigate(['upload']);
  }
}
