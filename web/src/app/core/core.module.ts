import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AppComponent, FooterComponent } from '@app/core/components';
import { MaterialModule } from '@app/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    AppComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    AppComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
