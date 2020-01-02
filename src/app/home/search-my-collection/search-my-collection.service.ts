import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SearchMyCollectionService {
  constructor(private http: HttpService) {
  }

  search(terms: Observable<string>, ids, fetchedNo = 8, fetchedOffset = 0) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term, ids, fetchedNo, fetchedOffset))
    );
  }

  searchEntries(term, idsArray, fetchedNo = 8, fetchedOffset = 0) {
    const apiKey = 'api_key=kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi';
    const q = `q=${term}`;
    const limit = `limit=${fetchedNo}`;
    const offset = `offset=${fetchedOffset}`;
    const ids = `ids=${idsArray}`;
    const queryParams = '?' + apiKey + '&' + q + '&' + limit + '&' + offset + '&' + ids;
    const baseUrl = 'http://' + 'api.giphy.com/v1/gifs';

    const url = baseUrl + queryParams;
    return this.http.get(url);
  }
}
