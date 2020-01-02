import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { TrendingComponent } from './trending/trending.component';
import { TrendingModule } from './trending/trending.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from './search/search.module';
import { FormsModule } from '@angular/forms';
import { MyCollectionModule } from '../my-collection/my-collection.module';
import { RouterModule } from '@angular/router';
import { SearchMyCollectionModule } from './search-my-collection/search-my-collection.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FormsModule, TrendingModule, SearchModule, SearchMyCollectionModule, MyCollectionModule, RouterModule],
  exports: [HomeComponent]
})
export class HomeModule {
}
