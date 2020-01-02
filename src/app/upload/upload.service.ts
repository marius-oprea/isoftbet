import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UploadService {
  constructor(private http: HttpService) {
  }

  upload(file, tagsList) {
    const apiKey = 'api_key=kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi';

    const baseUrl = 'https://' + 'upload.giphy.com/v1/gifs';

    const url = baseUrl + '?' + apiKey;

    const body = new FormData();
    body.append('api_key', 'kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi');
    body.append('file', file as string);
    body.append('tags', tagsList);
    body.append('username', 'oprea_marius');

    const p = new HttpParams();
    p.append('api_key', 'kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi');

    const options: any = {
      headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
      params: p
    };

    return this.http.post(url, body, options);
  }

  uploadUrl(gifUrl, tagsList) {
    const apiKey = 'kWLHX6L2UGMrBd4o4osZdRIoHhJ9SqGi';
    const baseUrl = 'https://' + 'upload.giphy.com/v1/gifs';

    const url = baseUrl;

    const body = new FormData();
    body.append('api_key', apiKey);
    body.append('tags', tagsList);
    body.append('username', 'oprea_marius');
    body.append('source_image_url', gifUrl);

    const httpParams = new HttpParams().append('api_key', apiKey);

    const options: any = {
      params: httpParams
    };

    return this.http.post(url, body, options);
  }
}
