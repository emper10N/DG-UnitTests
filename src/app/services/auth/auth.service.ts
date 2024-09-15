import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService //private cookieService: CookieService
  ) {}

  register(userData: any): Observable<any> {
    return this.apiService.post();
  }

  setToken(token: string): void {
    localStorage.setItem('UserToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('UserToken');
  }

  deleteToken(): void {
    localStorage.removeItem('UserToken');
  }
}
