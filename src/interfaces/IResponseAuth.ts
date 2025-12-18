import { IUser } from "./IUser";

export interface IResponseAuth {
  user: IUser;
  token: string;
}
