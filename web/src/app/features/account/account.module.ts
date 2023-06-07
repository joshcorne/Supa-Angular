import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from '@app/features/account';
import { LoginComponent } from '@app/features/account/components';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from '@app/features/account/components';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';

/**
 * This account module isused to handle anything regarding auth and profiles.
 * Account is used to refer to the user authentication together with profile.
 */
@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AccountModule { }
