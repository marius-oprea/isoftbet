import { NgModule } from '@angular/core';
import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { ImageGridModule } from 'src/app/shared/image-grid/image-grid.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, ImageGridModule, PaginationModule.forRoot()],
  exports: [SearchComponent]
})
export class SearchModule {
}
