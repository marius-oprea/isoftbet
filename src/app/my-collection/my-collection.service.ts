import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../core/http.service';

@Injectable({providedIn: 'root'})
export class MyCollectionService {
  myCollectionIDs: string[];
  myCollectionIDs$: BehaviorSubject<string[]>;

  constructor(private http: HttpService) {
    this.myCollectionIDs = [];
    this.myCollectionIDs$ = new BehaviorSubject<string[]>([]);
  }

  addNewImageID(imageID: string) {
    this.myCollectionIDs.push(imageID);
    this.myCollectionIDs$.next(this.myCollectionIDs);
    localStorage.setItem('myCollectionIDs', JSON.stringify(this.myCollectionIDs));
  }

  removeImageID(imageID) {
    this.myCollectionIDs = this.myCollectionIDs.filter( (value, index, array) => value !== imageID);
    this.myCollectionIDs$.next(this.myCollectionIDs);
    localStorage.setItem('myCollectionIDs', JSON.stringify(this.myCollectionIDs));
  }

  getAllImagesIDs(): string[] {
    this.myCollectionIDs = JSON.parse(localStorage.getItem('myCollectionIDs'));
    this.myCollectionIDs$.next(this.myCollectionIDs);
    return this.myCollectionIDs;
  }

  initCollectionIds() {
    this.myCollectionIDs = [];
    this.myCollectionIDs$ = new BehaviorSubject<string[]>([]);

    localStorage.setItem('myCollectionIDs', JSON.stringify(this.myCollectionIDs));
  }

  isInColection(imageID): boolean {
    return this.myCollectionIDs.filter( (value, index, array) => value === imageID).length ? true : false;
  }

  getImages(idsArray) {
    const baseUrl = 'http://' + 'api.giphy.com/v1/gifs';
    const apiKey = 'api_key=kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi';
    const ids = `ids=${idsArray}`;
    const queryParams = '?' + apiKey + '&' + ids;
    const url = baseUrl + queryParams;
    return this.http.get(url);
  }
}
