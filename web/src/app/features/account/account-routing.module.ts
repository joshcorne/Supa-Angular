import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AuthService } from '@app/core/services';
import { ProfileComponent, LoginComponent } from '@app/features/account/components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
      inject(AuthService).canActivateSignedIn(snapshot, state)],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
