import { QueryKey, useMutation, useQuery } from 'react-query'
import { Epic } from 'types/epic'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp()
  return useQuery<Epic[]>(['epics', params], () =>
    client('epics', {
      data: cleanObject(params || {}),
    }),
  )
}

// 添加项目列表
export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (data: Partial<Epic>) => client(`epics`, { method: 'POST', data }),
    useAddConfig(queryKey),
  )
}

// 删除看板
export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey),
  )
}
