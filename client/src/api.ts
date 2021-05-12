import axios, { AxiosResponse } from "axios";
import { Users, UserType } from "./interfaces/users.interface";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 20000,
});

const responseBody = (res: AxiosResponse) => res.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
};

export const User = {
  getUsers: (): Promise<Users> => requests.get("users"),
  createUser: (user: UserType): Promise<UserType> =>
    requests.post("users", user),
};
