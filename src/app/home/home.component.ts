import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SearchService } from './search/search.service';
import { MyCollectionService } from '../my-collection/my-collection.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchTerm$: Subject<string>;
  collectionNo$;
  searchMyCollection: boolean;
  @ViewChild('searchCtrl', null) searchCtrl: ElementRef<any>;

  constructor(private searchService: SearchService, private myCollectionService: MyCollectionService, private router: Router) {
    this.searchTerm$ = new Subject<string>();
    this.searchService.search(this.searchTerm$);

    this.collectionNo$ = this.myCollectionService.myCollectionIDs$;
  }

  onMyCollection() {
    this.router.navigate(['my-collection']);
  }

  onUpload() {
    this.router.navigate(['upload']);
  }

  onHome() {
    this.router.navigate(['']);
    this.router.navigate(['']);
  }

  onSearchMyCollection() {
    this.searchMyCollection = !this.searchMyCollection;
    this.searchTerm$.next('');

    this.searchCtrl.nativeElement.value = '';
  }

  onSearch(event) {
    this.searchTerm$.next(event.target.value);
  }
}
