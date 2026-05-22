import { fetchClient } from "./fetchClient";
import { API_ROUTES } from "../constants/ApiRoutes";
import type { User } from "../types/user.types";

export const loginApi = (email: string, password: string) => {
  return fetchClient<{
    token: string;
    user: User;
    message: string;
  }>(API_ROUTES.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerApi = (
  username: string,
  email: string,
  password: string,
) => {
  return fetchClient<{ status: string }>(API_ROUTES.REGISTER, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
};
