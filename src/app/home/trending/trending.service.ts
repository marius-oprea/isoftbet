import { Injectable, Inject } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

@Injectable()
export class TrendingService {
  constructor(private http: HttpService) {
  }

  getTrendingResult(fetchedNo = 8, fetchedOffset = 0) {
    const baseUrl = 'http://' + 'api.giphy.com/v1/gifs/trending';
    const apiKey = 'api_key=kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi';
    const limit = `limit=${fetchedNo}`;
    const offset = `offset=${fetchedOffset}`;
    const queryParams = '?' + apiKey + '&' + limit + '&' + offset;
    const url = baseUrl + queryParams;
    return this.http.get(url);
  }
}
