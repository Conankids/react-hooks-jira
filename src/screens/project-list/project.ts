import { useCallback, useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/use-async'
import { Project } from './list'

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  const getProjects = useCallback(
    () =>
      client('projects', {
        data: cleanObject(params || {}),
      }),
    [client, params],
  )
  useEffect(() => {
    run(getProjects(), {
      retry: getProjects,
    })
  }, [params, run, getProjects])
  return result
}

// 编辑项目列表
export const useEditProject = () => {
  const { run, ...restAsync } = useAsync()
  const client = useHttp()
  const mutate = (data: Partial<Project>) => {
    return run(client(`projects/${data.id}`, { method: 'PATCH', data }))
  }
  return { mutate, ...restAsync }
}

// 添加项目列表
export const useAddProject = () => {
  const { run, ...restAsync } = useAsync()
  const client = useHttp()
  const mutate = (data: Partial<Project>) => {
    return run(client(`projects/${data.id}`, { method: 'POST', data }))
  }
  return { mutate, ...restAsync }
}
