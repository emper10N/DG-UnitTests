import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { IRequest } from '../../interfaces/request.interface';
import { IRegUser } from '../../interfaces/regUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = true;

  public currentRequestSig = signal<IRequest | undefined | null>(undefined);
  public currentUserSig = signal<IRegUser | undefined | null>(undefined);
  constructor(private apiService: ApiService) {}

  register(userData: IUser): Observable<IRequest> {
    return this.apiService.registerUser(userData);
  }

  login(userData: IUser): Observable<IRequest> {
    this.isAuth = true;
    return this.apiService.loginUser(userData);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.setItem('token', '');
    this.currentRequestSig.set(undefined);
  }

  public isAuthenticated(): boolean {
    return this.currentUserSig !== undefined;
  }
}
