import { CONFIG } from "@convertium/constants";
import { CoreAPI } from "./core-api";
import { UserAPI } from "./user";

export class API {
  api: string;

  static defaultInstance: API;
  static instances: Record<string, API> = {};

  static getOrCreateInstance(apiBaseUrl?: string): API {
    if (apiBaseUrl) {
      if (!API.instances[apiBaseUrl]) {
        const newAPI = new API(apiBaseUrl);
        API.instances[apiBaseUrl] = newAPI;
        return newAPI;
      }
      return API.instances[apiBaseUrl];
    }

    if (!API.defaultInstance) throw new Error("API is not initialized, call API.initialize() first");

    return API.defaultInstance;
  }

  static initialize() {
    if (API.defaultInstance)
      throw new Error("API is already initialized, this is likely a result of calling API.initialize() twice");

    API.defaultInstance = new API(CONFIG.API_BASE_URL);
  }

  constructor(apiBaseUrl: string) {
    this.api = apiBaseUrl;
  }

  core(): CoreAPI {
    return new CoreAPI(this.api);
  }

  user(): UserAPI {
    return new UserAPI(this.api);
  }
}
