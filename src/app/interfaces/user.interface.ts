import { Observable } from 'rxjs';
import { IRequest } from './request.interface';

export interface IUser {
  username: string;
  password: string;
  email: string;
}

export interface IUserInterface {
  Login: (credentials: IUser) => Observable<IRequest>;
  LogOut: () => void;
  Register: (credentials: IUser) => Observable<IRequest>;
  SaveSessionInfo: (sessionInfo: IUser, uid: string) => void;
  isAuthorized: () => boolean;
  CreateUserInfo: (uid: string, user: IUser) => Observable<void>;
  LoadUserInfo: (uid: string) => Observable<IUser>;
  UpdateUserInfo: (uid: string, newData: IUser) => Observable<void>;
  GetUserInfo: () => IUser;
  ChangePassword: (newPassword: string) => void;
  ChangeEmail: (newPassword: string) => void;
}
