import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/user.interface';
import { IRequest } from '../../interfaces/request.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _loginUrl: string = 'http://localhost:5001/api/v1/auth/login';
  private _registerUrl: string = 'http://localhost:5001/api/v1/users';

  constructor(private httpClient: HttpClient) {}

  public registerUser(user: IUser) {
    return this.httpClient.post<IRequest>(
      'http://localhost:5001/api/v1/users',
      user
    );
  }

  public loginUser(user: IUser) {
    return this.httpClient.post<IRequest>(
      'http://localhost:5001/api/v1/auth/login',
      user
    );
  }
}
