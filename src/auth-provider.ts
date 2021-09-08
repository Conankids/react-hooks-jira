// 在真实环境中，如果使用firebase这种第三方服务的话，本文件不需要开发者开发
import { http } from 'utils/http'
import { User } from 'screens/project-list/search-panel'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (param: { username: string; password: string }) => {
  return http(`login`, {
    method: 'POST',
    data: param,
  }).then(handleUserResponse)
}

export const register = (param: { username: string; password: string }) => {
  return http(`register`, {
    method: 'POST',
    data: param,
  }).then(handleUserResponse)
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
