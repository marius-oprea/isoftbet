import { NgModule } from '@angular/core';
import { SearchMyCollectionComponent } from './search-my-collection.component';
import { CommonModule } from '@angular/common';
import { ImageGridModule } from 'src/app/shared/image-grid/image-grid.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [SearchMyCollectionComponent],
  imports: [CommonModule, ImageGridModule, PaginationModule.forRoot()],
  exports: [SearchMyCollectionComponent]
})
export class SearchMyCollectionModule {
}
