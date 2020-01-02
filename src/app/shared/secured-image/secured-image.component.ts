import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewChildren, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/http.service';

@Component({
  templateUrl: './secured-image.component.html',
  styleUrls: ['./secured-image.component.scss'],
  selector: 'app-secured-image'
})
export class SecuredImageComponent implements OnChanges, AfterViewInit {
  @Input() src: string;
  private src$: BehaviorSubject<string>;
  dataUrl$: Observable<string>;
  loaded: boolean;
  @ViewChild('spinner', null) spinner: ElementRef<any>;
  @ViewChild('image', null) image: ElementRef<any>;

  constructor(
    private httpClient: HttpService,
    private domSanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private renderer: Renderer2) {

    this.src$ = new BehaviorSubject(this.src);
    this.loaded = false;
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.image.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.spinner.nativeElement, 'display', 'inline-block');
  }

  private loadImage(url: string): Observable<any> {
    return this.httpClient
      .get(url, {responseType: 'blob'})
      .pipe(
        tap(e => {
          this.renderer.setStyle(this.image.nativeElement, 'display', 'inline-block');
          this.renderer.setStyle(this.spinner.nativeElement, 'display', 'none');
        }),
        map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      this.src$.next(this.src);
      this.dataUrl$ = this.src$.pipe(switchMap(url => this.loadImage(url)));
    }
  }
}
