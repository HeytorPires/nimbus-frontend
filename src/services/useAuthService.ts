import { IUser } from "@/interfaces/IUser";
import { useRequest } from "./useRequest";
import { IResponseAuth } from "@/interfaces/IResponseAuth";

export const useAuthService = () => {
  const requestUser = useRequest<IUser>();
  const request = useRequest<IResponseAuth>();
  const requestVoid = useRequest<void>();
  const path = "sessions";

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<IUser> => {
    return requestUser
      .post({
        path: `users`,
        sendAuthorization: false,
        body: { email, password, name },
      })
      .then((result) => result)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<IResponseAuth> => {
    return request
      .post({
        path: `${path}`,
        sendAuthorization: false,
        body: { email, password },
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error.message || "Credenciais inválidas");
      });
  };

  const getUser = async (): Promise<IUser> => {
    return requestUser
      .getOne({
        path: `users/me`,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const signOut = async (): Promise<void> => {
    return requestVoid
      .remove({
        path: `${path}`,
        sendAuthorization: true,
      })
      .catch(() => {
        // Silently fail - local cleanup will happen regardless
      });
  };

  return { signUp, signIn, getUser, signOut };
};
