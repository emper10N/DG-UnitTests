import {
  afterNextRender,
  Inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { IRequest } from '../../interfaces/request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  constructor(private apiService: ApiService) {}

  register(userData: IUser): Observable<IRequest> {
    return this.apiService.registerUser(userData);
  }

  login(userData: IUser): Observable<IRequest> {
    return this.apiService.loginUser(userData);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }
}
