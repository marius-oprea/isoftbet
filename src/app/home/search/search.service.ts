import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SearchService {

  constructor(private http: HttpService) {
  }

  search(terms: Observable<string>, searchInMyCollection = false, ids?, fetchedNo = 8, fetchedOffset = 0) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term, fetchedNo, fetchedOffset))
    );
  }

  searchEntries(term, fetchedNo = 8, fetchedOffset = 0) {
    const apiKey = 'api_key=kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi';
    const q = `q=${term}`;
    const limit = `limit=${fetchedNo}`;
    const offset = `offset=${fetchedOffset}`;
    const queryParams = '?' + apiKey + '&' + q + '&' + limit + '&' + offset;
    const baseUrl = 'https://' + 'api.giphy.com/v1/gifs/search';

    const url = baseUrl + queryParams;
    return this.http.get(url);
  }
}
