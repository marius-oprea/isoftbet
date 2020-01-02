import { Component, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MyCollectionService } from 'src/app/my-collection/my-collection.service';

@Component({
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss'],
  selector: 'app-image-grid'
})
export class ImageGridComponent {
  @Input() title: string;
  @Input() data: any;
  @Input() src: string;
  @Input() total;
  modalRef: BsModalRef;
  selectedItem: any;
  selectedItemTitle: any;
  items = [];
  deleted: [];
  @Input() isMyCollection: boolean;

  constructor(private modalService: BsModalService, private myCollectionService: MyCollectionService) {
    this.isMyCollection = false;
    this.deleted = [];
  }

  openModal(template: TemplateRef<any>, item) {
    this.selectedItem = item.images.original.url;
    this.selectedItemTitle = item.title;
    this.modalRef = this.modalService.show(template);
  }

  onAddToMyCollection(imageID) {
    this.myCollectionService.addNewImageID(imageID);
  }

  isChecked(imageID) {
    return this.myCollectionService.isInColection(imageID);
  }

  onRemove(index, imageID) {
    this.myCollectionService.removeImageID(imageID);

    const elem = document.getElementById(`card${index}`);
    elem.remove();

    this.total--;
  }
}
