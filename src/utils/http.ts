import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'

const apiPath = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  data?: Record<string, unknown>
  token?: string
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {},
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...headers,
    },
    ...customConfig,
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data)
  }
  // fetch在得断网情况下请求错误不会触发catch错误
  return window.fetch(`${apiPath}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    if (res.ok) {
      return await res.json()
    } else {
      return Promise.reject(res)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token })
}
