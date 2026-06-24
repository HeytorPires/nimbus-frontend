import { useNavigate } from "react-router-dom";
import { IPaginationReturn } from "../interfaces/IPaginationReturn";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useSessionStorage } from "../hooks/providers/useSessionStorage";
import AppError from "@/errors/AppError";

interface IRequestParams {
  path?: string;
  body?: any;
  headers?: any;
  sendAuthorization?: boolean;
}

interface IRequest<T> {
  post(request: IRequestParams): Promise<T>;
  postAndGetManyPaginated(
    request: IRequestParams,
  ): Promise<IPaginationReturn<T[]>>;
  put(request: IRequestParams): Promise<T>;
  patch(request: IRequestParams): Promise<T>;
  getOne(request: IRequestParams): Promise<T>;
  getMany(request: IRequestParams): Promise<T[]>;
  getManyPaginated(request: IRequestParams): Promise<IPaginationReturn<T[]>>;
  remove(request: IRequestParams): Promise<void>;
}

const validateUrl = () => {
  if (!import.meta.env.VITE_API_URL) {
    throw new AppError(
      "The base API URL was not provided. Please check the .env file.",
    );
  }
};

export const useRequest = <T>(): IRequest<T> => {
  const navigate = useNavigate();
  const [baseUrl] = useState(import.meta.env.VITE_API_URL);
  const authContext = useContext(AuthContext);
  const { setUser, token } = authContext || {};
  const sessionStorage = useSessionStorage();

  const getIsLogin = (url: string): boolean => {
    return url?.includes("sessions");
  };

  const setUnauthorized = (): void => {
    sessionStorage.clear();
    navigate("/login");
    setUser?.(null);
    throw new AppError("Your session has expired. Please log in again.");
  };

  const post = async (request: IRequestParams): Promise<T> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "POST",
      headers,
      data: { ...request.body },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const put = async (request: IRequestParams): Promise<any> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "PUT",
      headers,
      data: { ...request.body },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const patch = async (request: IRequestParams): Promise<any> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "PATCH",
      headers,
      data: request.body,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const remove = async (request: IRequestParams): Promise<void> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "DELETE",
      headers,
      data: { ...request.body },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }

        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const getOne = async (request: IRequestParams): Promise<T> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "GET",
      headers,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const getMany = async (request: IRequestParams): Promise<T[]> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "GET",
      headers,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const getManyPaginated = async (
    request: IRequestParams,
  ): Promise<IPaginationReturn<T[]>> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "GET",
      headers,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  const postAndGetManyPaginated = async (
    request: IRequestParams,
  ): Promise<IPaginationReturn<T[]>> => {
    validateUrl();
    const headers = { ...request.headers };
    if (request.sendAuthorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await axios({
      url: `${baseUrl}/${request.path}`,
      method: "POST",
      headers,
      data: { ...request.body },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 &&
          !getIsLogin(error?.request?.responseURL || "")
        ) {
          return setUnauthorized();
        }
        throw new AppError(
          error?.response?.data?.validation?.params?.message ||
            error?.response?.data?.validation?.body?.message ||
            error?.response?.data?.validation?.query?.message ||
            error?.response?.data?.message ||
            "An error occurred while executing the procedure",
          error?.response?.status || 400,
        );
      });
  };

  return {
    post,
    getOne,
    getMany,
    put,
    remove,
    getManyPaginated,
    patch,
    postAndGetManyPaginated,
  };
};
