import AppError from "@/errors/AppError";
import { ITag } from "../interfaces/ITag";
import { useRequest } from "./useRequest";

export const useTagService = () => {
  const request = useRequest<ITag>();
  const path = "tags";

  const getAll = async (): Promise<ITag[]> => {
    return await request
      .getMany({
        path: `${path}`,
        sendAuthorization: true,
      })
      .then((result) => result)
      .catch((error) => {
        throw new AppError(error.message);
      });
  };

  const getById = async (id: string): Promise<ITag | null> => {
    return await request
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
    payload: Omit<ITag, "id" | "created_at">,
  ): Promise<ITag> => {
    return await request
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

  const update = async (id: string, payload: ITag): Promise<ITag> => {
    return await request
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

export default useTagService;
