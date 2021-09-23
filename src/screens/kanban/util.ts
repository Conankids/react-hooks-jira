import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useProject } from 'screens/project-list/project'
import { useDebounce } from 'utils'
import { useTask } from 'utils/task'
import { useQueryParam } from 'utils/url'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [param] = useQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const debounceName = useDebounce(param.name, 300)
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debounceName,
    }),
    [projectId, param, debounceName],
  )
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModel = () => {
  const [{ editingTaskId }, setEditingTaskId] = useQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading } = useTask(+editingTaskId)
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId],
  )
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  }
}
