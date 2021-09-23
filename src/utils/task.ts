import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from './use-optimistic-options'

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', params], () =>
    client('tasks', {
      data: cleanObject(params || {}),
    }),
  )
}

// 添加任务
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (data: Partial<Task>) => client(`tasks`, { method: 'POST', data }),
    useAddConfig(queryKey),
  )
}

// 获取任务详情
export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  })
}

// 编辑任务详情
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (data: Partial<Task>) =>
      client(`tasks/${data.id}`, { method: 'PATCH', data }),
    useEditConfig(queryKey),
  )
}

// 删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  )
}
