import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from '@app/material.module';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoadingComponent
  ]
})
export class SharedModule { }
