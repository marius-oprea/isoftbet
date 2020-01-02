import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', redirectTo: ''},
  { path: 'upload', component: UploadComponent },
  { path: 'my-collection', component: MyCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
