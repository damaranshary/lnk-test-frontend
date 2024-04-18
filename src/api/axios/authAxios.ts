import axios from "axios";
import {
  LoginResponse,
  LoginSchema as LoginRequest,
  RegisterResponse,
  RegisterRequest,
  LogoutResponse,
  UserResponse,
} from "../../types/userTypes";

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    {
      email,
      password,
    },
  );

  return response.data;
};

export const register = async ({
  name,
  email,
  password,
}: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      name,
      email,
      password,
    },
  );

  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Anda belum login");
  }

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.status !== 200) {
    throw new Error("Gagal logout");
  }

  localStorage.removeItem("accessToken");

  return response.data;
};


export const getProfile = async (url: string): Promise<UserResponse> => {
    const accessToken = localStorage.getItem("accessToken");
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };