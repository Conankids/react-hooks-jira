import { useEffect } from 'react'
import { User } from 'types/user'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async'

export const useUsers = (params?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>()
  const client = useHttp()
  useEffect(() => {
    run(
      client('users', {
        data: cleanObject(params || {}),
      }),
    )
  }, [params, client, run])
  return result
}
