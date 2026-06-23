import { useRequest } from "./useRequest";
import AppError from "@/errors/AppError";

export const usePasswordService = () => {
  const request = useRequest<void>();
  const path = "password";

  const forgotPassword = async (email: string): Promise<void> => {
    return request
      .post({
        path: `${path}/forgot`,
        sendAuthorization: false,
        body: { email },
      })
      .then(() => undefined)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const resetPassword = async (
    password: string,
    password_confirmation: string,
    token: string
  ): Promise<void> => {
    return request
      .put({
        path: `${path}/reset`,
        sendAuthorization: false,
        body: { password, password_confirmation, token },
      })
      .then(() => undefined)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  return { forgotPassword, resetPassword };
};
