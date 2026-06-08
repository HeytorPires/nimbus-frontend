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
      "A url base da API não foi informada. É necessário verificar o arquivo .env",
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
    return url?.split("/").indexOf("login") !== -1;
  };

  const setUnauthorized = (): void => {
    sessionStorage.clear();
    navigate("/login");
    setUser({
      accessToken: "",
      avatar_url: "",
      created_at: "",
      email: "",
      id: "",
      name: "",
    });
    throw new AppError("Sua sessão expirou. Faça o login novamente!");
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
            "Ocorreu um erro ao executar o procedimento",
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
