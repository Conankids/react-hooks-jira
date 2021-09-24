import { useQuery } from 'react-query'
import { User } from 'types/user'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp()
  return useQuery<User[]>(['users', params], () =>
    client('users', {
      data: cleanObject(params || {}),
    }),
  )
}
