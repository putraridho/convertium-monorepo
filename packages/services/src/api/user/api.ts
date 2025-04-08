import { AxiosRequestConfig } from "axios";
import { CoreAPI } from "../core-api";

export class UserAPI {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async register(payload: { user_id: string; password: string }, config?: AxiosRequestConfig) {
    const api = new CoreAPI(this.apiBaseUrl, config, false);

    return api.post("/signup", payload);
  }

  async login(payload: { user_id: string; password: string; isKeepLoggedIn?: boolean }, config?: AxiosRequestConfig) {
    const api = new CoreAPI(this.apiBaseUrl, config, false);

    return api.post("/login", payload);
  }
}
