import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  post(): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}`,
      {
        id: '11233',
        username: 'aboba',
        email: 'd@ff.com',
        password: 'porno',
        token: 'iaushguhg',
      },
      { withCredentials: true }
    );
  }

  get(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`);
  }
}
