import { User } from "@convertium/types";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CoreAPI } from "../core-api";

export class UserAPI {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async me(config?: AxiosRequestConfig): Promise<User> {
    const api = new CoreAPI(this.apiBaseUrl, config);

    try {
      const response = await api.get<User>("/me");

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async register(payload: { user_id: string; password: string }, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    const api = new CoreAPI(this.apiBaseUrl, config, false);

    return api.post("/signup", payload);
  }

  async login(
    payload: { user_id: string; password: string; isKeepLoggedIn?: boolean },
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    const api = new CoreAPI(this.apiBaseUrl, config, false);

    return api.post("/login", payload);
  }

  async update(payload: Partial<Omit<User, "id" | "user_id">>, config?: AxiosRequestConfig) {
    const api = new CoreAPI(this.apiBaseUrl, config);

    try {
      await api.post("/user", payload);
    } catch (e) {
      throw e;
    }
  }
}
