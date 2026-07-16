import { IUser } from "@/interfaces/IUser";
import { useRequest } from "./useRequest";
import AppError from "@/errors/AppError";

interface IUpdateProfile {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

export const useProfileService = () => {
  const request = useRequest<IUser>();
  const path = "profile";

  const getProfile = async (): Promise<IUser> => {
    return request
      .getOne({
        path,
        withCredentials: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const updateProfile = async (payload: IUpdateProfile): Promise<IUser> => {
    return request
      .put({
        path,
        body: payload,
        withCredentials: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  return { getProfile, updateProfile };
};
