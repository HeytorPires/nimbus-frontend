import { IUser } from "@/interfaces/IUser";
import { useRequest } from "./useRequest";

export const useUserService = () => {
  const request = useRequest<IUser>();
  const path = "users";

  const getUser = async (): Promise<IUser> => {
    return request
      .getOne({
        path: `${path}/me`,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  return { getUser };
};
