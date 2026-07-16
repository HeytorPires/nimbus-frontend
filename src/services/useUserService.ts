import { IUser } from "@/interfaces/IUser";
import { useRequest } from "./useRequest";
import AppError from "@/errors/AppError";

export const useUserService = () => {
  const request = useRequest<IUser>();
  const requestMany = useRequest<IUser>();
  const path = "users";

  const getUser = async (): Promise<IUser> => {
    return request
      .getOne({
        path: `${path}/me`,
        withCredentials: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const getAll = async (): Promise<IUser[]> => {
    return requestMany
      .getMany({
        path,
        withCredentials: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const updateAvatar = async (file: File): Promise<IUser> => {
    const formData = new FormData();
    formData.append("avatar", file);

    return request
      .patch({
        path: `${path}/avatar`,
        withCredentials: true,
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error) => {
        throw new AppError(error?.message || "Erro ao atualizar avatar");
      });
  };

  return { getUser, getAll, updateAvatar };
};
