/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "@convertium/utils";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";

export class CoreAPI {
  private axiosInstance: AxiosInstance;

  constructor(apiBaseUrl: string, config?: CreateAxiosDefaults, withJWT = true) {
    this.axiosInstance = axios.create({
      baseURL: apiBaseUrl,
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins (use cautiously)
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        ...(withJWT
          ? {
              Authorization: `Bearer ${this.getAccessToken()}`,
            }
          : {}),
        ...config?.headers,
      },
    });
  }

  getAccessToken() {
    return getToken();
  }

  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.request<T, R, D>(config);
  }

  head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.head<T, R, D>(url, config);
  }

  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.get<T, R, D>(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(url: string, payload?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.post<T, R, D>(url, payload, config);
  }

  put<T = any, R = AxiosResponse<T>, D = any>(url: string, payload?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.put<T, R, D>(url, payload, config);
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, payload?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.patch<T, R, D>(url, payload, config);
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.delete<T, R, D>(url, config);
  }

  options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.axiosInstance.options<T, R, D>(url, config);
  }
  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.postForm<T, R, D>(url, payload, config);
  }

  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.putForm<T, R, D>(url, payload, config);
  }

  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    payload?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosInstance.patchForm<T, R, D>(url, payload, config);
  }
}
