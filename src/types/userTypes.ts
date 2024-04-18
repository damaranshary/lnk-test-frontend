export interface User {
  name: string;
  email: string;
}

export interface LoginSchema {
  email: string;
  password: string;
}

export interface RegisterSchema {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginDataResponse {
  name: string;
  email: string;
  accessToken: string;
}

export interface LoginResponse {
  status: string;
  data: LoginDataResponse;
  message: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

export interface LogoutResponse {
  status: string;
  message: string;
}
