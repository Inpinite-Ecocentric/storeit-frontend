/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosService from "./AxiosService";

type ApiConfig = string | string[];
type CrudResponse = [number, unknown];

export default abstract class ApiService {

  private axiosService: AxiosService = new AxiosService();

  public async crud(api: ApiConfig, data: unknown): Promise<CrudResponse> {
    const config: AxiosRequestConfig = {
      headers: {},
    };

    const url = api[0];
    const BearerToken = api[2]; 
    const method = api[1];

    const needsBearer = BearerToken === "true";

    if (needsBearer) {
      config.headers = {
        ...config.headers,
        needsBearer: true,
      };
    }

    if (data instanceof FormData) {
      config.headers!["Content-Type"] = "multipart/form-data";
    } else if (data) {
      config.headers!["Content-Type"] = "application/json";
    }

    let response;

    try {
      switch (method) {
        case "GET":
          response = await this.get(url, config);
          break;
        case "POST":
          response = await this.post(url, data, config);
          break;
        case "PUT":
          response = await this.put(url, data, config);
          break;
        case "DELETE":
          response = await this.delete(url, { ...config, data });
          break;
        default:
          return [400, "Invalid HTTP method"];
      }

      const d: AxiosResponse = response;
      console.log("API call successful. Status:", d.status);
      return [d.status, d.data];
    } catch (error: any) {
      const err = error as AxiosError;
      console.log("err: ", err);
      return [err.response?.status || 500, { error: err.message }];

    }
  }

  private get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosService.axiosInstance.get(url, config);
  }

  private post(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<unknown> {
    const postResponse = this.axiosService.axiosInstance.post(
      url,
      data,
      config
    );

    return postResponse;
  }

  private put(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<unknown> {
    return this.axiosService.axiosInstance.put(url, data, config);
  }

  private delete(url: string, config?: AxiosRequestConfig): Promise<unknown> {
    return this.axiosService.axiosInstance.delete(url, config);
  }
}
