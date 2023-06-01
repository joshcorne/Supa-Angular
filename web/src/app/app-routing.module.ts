import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeComponent } from '@app/features/home/components';
import { AuthService } from '@app/core/services';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
      inject(AuthService).canActivateSignedIn(snapshot, state)],
  },
  {
    path: 'account',
    loadChildren: () => import('@app/features/account/account.module').then(m => m.AccountModule),
  },
  {
    path: '**', 
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
