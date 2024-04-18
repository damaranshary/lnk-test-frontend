import axios from "axios";
import {
  GetEmailsResponse,
  SendEmailRequest,
  SendEmailResponse,
} from "../../types/emailTypes";

export const getEmails = async (url: string): Promise<GetEmailsResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const sendEmail = async ({
  recipient,
  subject,
  description,
}: SendEmailRequest): Promise<SendEmailResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/email/send`,
    { recipient, subject, description },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
