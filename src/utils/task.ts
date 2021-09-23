import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { SortProps } from './kanban'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
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

// 重新整理任务列表
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: SortProps) => {
    return client('tasks/reorder', {
      data: params,
      method: 'POST',
    })
  }, useReorderTaskConfig(queryKey))
}
