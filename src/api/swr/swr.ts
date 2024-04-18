import useSWR from "swr";
import { getEmails} from "../axios/emailAxios";
import { getProfile } from "../axios/authAxios";

export const useGetEmails = (type: string) => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/email/${type}`,
    getEmails,
  );

  return {
    data,
    error,
    isLoading: isLoading,
  };
};

export const useGetProfile = () => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/auth/me`,
    getProfile,
  );

  return {
    data,
    error,
    isLoading: isLoading,
  };
}
