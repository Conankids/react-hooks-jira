import { useMemo } from 'react'
import { useQueryParam, useSetUrlSearchParam } from 'utils/url'
import { useProject } from './project'

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

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}

export const useProjectModel = () => {
  const [{ projectCreate }, setProjectCreate] = useQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useQueryParam([
    'editingProjectId',
  ])
  const { data: editingProject, isLoading } = useProject(+editingProjectId)
  const setUrlParams = useSetUrlSearchParam()

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id })

  return {
    projectModelOpen: projectCreate === 'true' || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  }
}
