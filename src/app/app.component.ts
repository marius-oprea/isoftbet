import { Component, OnInit } from '@angular/core';
import { MyCollectionService } from './my-collection/my-collection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'iSoftBet';

  constructor(private myCollectionService: MyCollectionService) {
  }

  ngOnInit() {
    this.initMyCollection();
  }

  initMyCollection() {
    const myCollectionIDs = this.myCollectionService.getAllImagesIDs();

    if (myCollectionIDs === undefined || myCollectionIDs === null || myCollectionIDs.length === 0) {
      this.myCollectionService.initCollectionIds();
    }
  }
}
