import { useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp()
  return useQuery<Kanban[]>(['kanbans', params], () =>
    client('kanbans', {
      data: cleanObject(params || {}),
    }),
  )
}
