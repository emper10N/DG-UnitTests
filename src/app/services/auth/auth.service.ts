import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { IRequest } from '../../interfaces/request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public isAuth = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) {
    this._isLoggedIn$.next(!!localStorage.getItem('token'));
  }

  register(userData: IUser): Observable<IRequest> {
    this._isLoggedIn$.next(true);
    return this.apiService.registerUser(userData);
  }

  login(userData: IUser): Observable<IRequest> {
    this._isLoggedIn$.next(true);
    return this.apiService.loginUser(userData);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.setItem('token', '');
    this._isLoggedIn$.next(false);
  }
}
