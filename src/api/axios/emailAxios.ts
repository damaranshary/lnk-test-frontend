import axios from "axios";
import { GetEmailsResponse } from "../../types/emailTypes";

export const getEmails = async (url: string): Promise<GetEmailsResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
