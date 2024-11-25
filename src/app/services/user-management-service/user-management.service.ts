import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUserData } from '../../interfaces/request.interface';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor() {}
  private _auth: AuthService = inject(AuthService);

  getUserData(): IUserData | null {
    if (this._auth.isAuth) {
      const str = localStorage.getItem('data')!;
      return JSON.parse(str);
    }
    return null;
  }
}
