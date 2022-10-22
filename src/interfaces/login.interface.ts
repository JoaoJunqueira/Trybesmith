export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  classe: string;
  level: string;
  password: string;
}

export interface IRegistration { 
  id?: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}