import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/authorization/user-login/user-login.component';
import { UserRegisterComponent } from './components/authorization/user-register/user-register.component';

const routes: Routes = [
  { path: '**', redirectTo: '' },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
