import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { User } from './search-panel'

export const useUsers = (params?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>()
  const client = useHttp()
  useEffect(() => {
    run(
      client('users', {
        data: cleanObject(params || {}),
      }),
    )
  }, [params])
  return result
}
