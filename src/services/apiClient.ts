import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";

const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

class ApiClient {
  async getAsync<T>(
    url: string,
    config: AxiosRequestConfig | undefined = undefined
  ) {
    try {
      NProgress.start();

      return (await client.get<T>(url, config)).data;
    } finally {
      NProgress.done();
    }
  }

  async postAsync<T>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig | undefined = undefined
  ) {
    try {
      NProgress.start();
      return (await client.post<T>(url, data, config)).data;
    } finally {
      NProgress.done();
    }
  }
}

export default new ApiClient();
