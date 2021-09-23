import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from './use-optimistic-options'

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery<Kanban[]>(['kanbans', params], () =>
    client('kanbans', {
      data: cleanObject(params || {}),
    }),
  )
}

// 添加项目列表
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (data: Partial<Kanban>) => client(`kanbans`, { method: 'POST', data }),
    useAddConfig(queryKey),
  )
}

// 删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  )
}

export type SortProps = {
  // 要重新排序的 item
  fromId: number
  // 目标 item
  referenceId: number
  // 放在目标前后位置
  type: 'after' | 'before'
  // 源看板id
  fromKanbanId?: number
  // 目标看板id
  toKanbanId?: number
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: SortProps) => {
    return client('kanbans/reorder', {
      data: params,
      method: 'POST',
    })
  }, useReorderKanbanConfig(queryKey))
}
