import { NgModule } from '@angular/core';
import { TrendingComponent } from './trending.component';
import { CommonModule } from '@angular/common';
import { ImageGridModule } from 'src/app/shared/image-grid/image-grid.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [TrendingComponent],
  imports: [CommonModule, ImageGridModule, PaginationModule.forRoot()],
  exports: [TrendingComponent]
})
export class TrendingModule {
}
