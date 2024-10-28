import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'registration',
    loadComponent: () =>
      import(
        './components/authorization/user-register/user-register.component'
      ).then((m) => m.UserRegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/authorization/user-login/user-login.component').then(
        (m) => m.UserLoginComponent
      ),
  },
  {
    path: 'new-chat',
    loadComponent: () =>
      import('./components/chat/chat-init/chat-init.component').then(
        (m) => m.ChatInitComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];
