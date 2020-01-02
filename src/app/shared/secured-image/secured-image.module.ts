import { NgModule } from '@angular/core';
import { SecuredImageComponent } from './secured-image.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SecuredImageComponent],
  imports: [CommonModule],
  exports: [SecuredImageComponent]
})
export class SecuredImageModule {
}
