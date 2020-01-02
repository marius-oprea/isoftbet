import { NgModule } from '@angular/core';
import { ImageGridComponent } from './image-grid.component';
import { CommonModule } from '@angular/common';
import { SecuredImageModule } from '../secured-image/secured-image.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ImageGridComponent],
  imports: [CommonModule, FormsModule, SecuredImageModule],
  exports: [ImageGridComponent]
})
export class ImageGridModule {
}
