export interface IRequest {
  userId: string;
  accessToken: string;
}

export interface IUserData {
  userId: string;
  username: string;
  password: string;
}

export interface IUserInfo {
  username: string;
  email: string;
}

export interface IChat {
  name: string;
}
