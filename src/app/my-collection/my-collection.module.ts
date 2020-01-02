import { NgModule } from '@angular/core';
import { MyCollectionComponent } from './my-collection.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageGridModule } from '../shared/image-grid/image-grid.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [MyCollectionComponent],
  imports: [RouterModule, ImageGridModule, CommonModule,  PaginationModule.forRoot()],
  exports: [MyCollectionComponent]
})
export class MyCollectionModule {
}
