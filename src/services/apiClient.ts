export class ApiClient {
  async getAsync<T = unknown>(url: string, params: Record<string, string> = {}): Promise<T | null> {
    const requestUrl = new URLSearchParams(params).toString()
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + url + (requestUrl ? `?${requestUrl}` : ''), {
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-method': '*',
        'Access-Control-Allow-Headers': '*',
      },
      redirect: 'follow',
    })
    if (response.ok)
      return (await response.json()) as T

    return null
  }
}
