import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";

const client = axios.create({
  timeout: 60000,
  baseURL: '/api'
});

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
