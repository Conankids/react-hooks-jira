import { useMemo } from 'react'
import { useQueryParam, useSetUrlSearchParam } from 'utils/url'

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

export const useProjectModel = () => {
  const [{ projectCreate }, setProjectCreate] = useQueryParam(['projectCreate'])
  const setUrlParams = useSetUrlSearchParam()
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setUrlParams({ projectCreate: '' })
  return {
    projectModelOpen: projectCreate === 'true',
    open,
    close,
  }
}
