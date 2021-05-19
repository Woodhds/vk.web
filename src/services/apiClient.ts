import axios, { AxiosRequestConfig } from 'axios'

const client = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

class ApiClient {
  async getAsync<T>(url: string, config: AxiosRequestConfig | undefined = undefined) {
    return (await client.get<T>(url, config)).data
  }

  async postAsync<T>(url: string, data?: unknown, config: AxiosRequestConfig | undefined = undefined) {
    return (await client.post<T>(url, data, config)).data
  }
}

export default new ApiClient()
