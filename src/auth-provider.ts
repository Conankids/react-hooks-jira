// 在真实环境中，如果使用firebase这种第三方服务的话，本文件不需要开发者开发

import { User } from 'screens/project-list/search-panel'

const apiPath = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (param: { username: string; password: string }) => {
  return fetch(`${apiPath}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(response)
    }
  })
}

export const register = (param: { username: string; password: string }) => {
  return fetch(`${apiPath}/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(response)
    }
  })
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
