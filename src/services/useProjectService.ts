import AppError from "@/errors/AppError";
import { IProject } from "../interfaces/IProject";
import { useRequest } from "./useRequest";
import { IPaginationReturn } from "@/interfaces/IPaginationReturn";

export const useProjectService = () => {
  const request = useRequest<IProject>();
  const requestUnique = useRequest<IProject>();
  const path = "projects";

  const getAll = async (
    url: string
  ): Promise<IPaginationReturn<IProject[]>> => {
    return await request
      .getManyPaginated({
        path: `${path}?${url}`,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const getById = async (id: string): Promise<IProject | null> => {
    return await requestUnique
      .getOne({
        path: `${path}/${id}`,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const create = async (
    payload: Omit<IProject, "id" | "created_at">
  ): Promise<IProject> => {
    return await requestUnique
      .post({
        path: `${path}`,
        body: payload,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const update = async (id: string, payload: IProject): Promise<IProject> => {
    return await requestUnique
      .put({
        path: `${path}/${id}`,
        body: payload,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const remove = async (id: string): Promise<void> => {
    return await request
      .remove({
        path: `${path}/${id}`,
        sendAuthorization: true,
      })
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

export default useProjectService;
