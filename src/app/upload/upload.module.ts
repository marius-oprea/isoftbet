import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadComponent],
  imports: [RouterModule, CommonModule, FormsModule],
  exports: [UploadComponent]
})
export class UploadModule {
}
