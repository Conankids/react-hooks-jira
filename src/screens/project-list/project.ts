import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { Project } from './list'

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  useEffect(() => {
    run(
      client('projects', {
        data: cleanObject(params || {}),
      }),
    )
  }, [params])
  return result
}
