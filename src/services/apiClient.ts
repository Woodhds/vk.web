import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";

const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

class ApiClient {
  async getAsync<T>(
    url: string,
    config: AxiosRequestConfig | undefined = undefined
  ) {
    NProgress.start();
    const data = (await client.get<T>(url, config)).data;
    NProgress.done();

    return data;
  }

  async postAsync<T>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig | undefined = undefined
  ) {
    NProgress.start();
    const result = (await client.post<T>(url, data, config)).data;
    NProgress.done();

    return result;
  }
}

export default new ApiClient();
