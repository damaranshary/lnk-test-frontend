import axios from "axios";
import {
  LoginResponse,
  LoginSchema as LoginRequest,
  RegisterResponse,
  RegisterRequest,
  LogoutResponse,
} from "../../types/userTypes";

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  console.log(import.meta.env.BACKEND_API_URL);
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
