import { IUser } from "@/interfaces/IUser";
import { useRequest } from "./useRequest";
import { IResponseAuth } from "@/interfaces/IResponseAuth";

export const useAuthService = () => {
  const requestUser = useRequest<IUser>();
  const request = useRequest<IResponseAuth>();
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
        return error;
      });
  };

  const getUser = async (): Promise<IUser> => {
    return requestUser
      .getOne({
        path: `users/me`,
      })
      .then((result) => result)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const signOut = async () => {
    return null;
  };

  return { signUp, signIn, getUser, signOut };
};
