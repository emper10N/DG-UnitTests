import {
  afterNextRender,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { IRequest } from '../../interfaces/request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = true;

  public currentUserSig = signal<IRequest | undefined | null>(undefined);
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
    this.currentUserSig.set(undefined);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
