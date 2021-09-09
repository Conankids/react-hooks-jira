import { useMemo } from 'react'
import { useQueryParam } from 'utils/url'

// 获取设置项目列表搜索参数hooks
export const useProjectsSearchParams = () => {
  const [param, setParam] = useQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param],
    ),
    setParam,
  ] as const
}
