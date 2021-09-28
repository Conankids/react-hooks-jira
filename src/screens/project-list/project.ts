import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery } from 'react-query'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from 'utils/use-optimistic-options'
import { Project } from 'types/project'

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', cleanObject(params)], () =>
    client('projects', {
      data: cleanObject(params || {}),
    }),
  )
}

// 编辑项目列表
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (data: Partial<Project>) =>
      client(`projects/${data.id}`, { method: 'PATCH', data }),
    useEditConfig(queryKey),
  )
}

// 添加项目列表
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (data: Partial<Project>) => client(`projects`, { method: 'POST', data }),
    useAddConfig(queryKey),
  )
}

// 删除项目
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`projects/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  )
}

// 获取项目详情
export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    },
  )
}
