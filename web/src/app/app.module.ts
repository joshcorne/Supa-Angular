import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/core/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from '@app/features/account';
import { MaterialModule } from '@app/material.module';
import { HomeModule } from '@app/features/home/home.module';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AccountModule,
    MaterialModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
