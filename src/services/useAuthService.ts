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
    name: string,
  ): Promise<IUser> => {
    return requestUser
      .post({
        path: `users`,
        withCredentials: true,
        body: { email, password, name },
      })
      .then((result) => result)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<IResponseAuth> => {
    return request
      .post({
        path: `${path}`,
        withCredentials: true,
        body: { email, password },
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("useAuthService signIn result:", error);
        throw new Error(error.message || "Invalid credentials");
      });
  };

  const getUser = async (): Promise<IUser> => {
    return requestUser
      .getOne({
        path: `users/me`,
        withCredentials: true,
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
        withCredentials: true,
      })
      .catch(() => {
        // Silently fail - local cleanup will happen regardless
      });
  };

  return { signUp, signIn, getUser, signOut };
};
