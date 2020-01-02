import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploadService } from './upload.service';
import { MyCollectionService } from '../my-collection/my-collection.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements AfterViewInit {
  @ViewChild('labelImport', null) labelImport: ElementRef<any>;
  collectionNo$;
  method;
  files: FileList;

  constructor(private uploadService: UploadService, private myCollectionService: MyCollectionService, private router: Router) {
    this.collectionNo$ = this.myCollectionService.myCollectionIDs$;
    this.method = '';
  }

  ngAfterViewInit() {
  }

  onClick(files: FileList, tags) {
    this.labelImport.nativeElement.innerText = Array.from(files)
    .map(f => f.name)
    .join(', ');

    this.files = files;
  }

  onUpload(url, tags) {
    if ( this.method === '') {
      alert('Please select an upload method');
      return;
    }

    if (this.method === 'local') {
      this.labelImport.nativeElement.innerText = Array.from(this.files)
      .map(f => f.name)
      .join(', ');

      const fileData = this.files[0];

      this.uploadService.upload(fileData, 'glob, earth').subscribe(r => {
        this.myCollectionService.addNewImageID(r.data.id);
        alert('uploaded image adde to MY COLLECTION');
      }, error => {
        console.log(error);
      });
    } else if (this.method === 'url') {
      if (this.validURL(url)) {
        this.uploadService.uploadUrl(url, tags).subscribe(r => {
          this.myCollectionService.addNewImageID(r.data.id);
          alert('uploaded image added to MY COLLECTION');
        }, error => {
          console.log(error);
        });
      } else {
        alert('Invalid Url');
      }
    }
  }

  onItemChange(event) {
    this.method = event.currentTarget.value;
  }

  validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  onHome() {
    this.router.navigate(['']);
    this.router.navigate(['']);
  }

  onMyCollection() {
    this.router.navigate(['my-collection']);
  }
}
