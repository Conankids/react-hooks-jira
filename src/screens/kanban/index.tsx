import styled from '@emotion/styled'
import { Spin } from 'antd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { ScreenContainer } from 'components/lib'
import React, { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDocumentTitle } from 'utils'
import { useKanbans, useReorderKanban } from 'utils/kanban'
import { useReorderTask, useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { TaskModal } from './task-modal'
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: curProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams(),
  )
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = kanbanIsLoading || taskIsLoading

  const onDragEnd = useDragEnd()
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{curProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <ColumnContainer>
            <Drop
              type={'COLUMN'}
              direction={'horizontal'}
              droppableId={'kanban'}
            >
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={'kanban' + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey())
  const { data: allTasks = [] } = useTasks(useTasksSearchParams())
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey())
  return useCallback(
    ({ type, source, destination }: DropResult) => {
      if (!destination) {
        return
      }
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index]?.id
        const toId = kanbans?.[destination.index]?.id
        if (!fromId || !toId || fromId === toId) {
          return
        }
        const type = source.index > destination.index ? 'before' : 'after'
        reorderKanban({ fromId, referenceId: toId, type })
      }
      if (type === 'ROW') {
        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId
        const fromTaskId = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId,
        )[source.index]?.id
        const toTaskId = allTasks.filter(
          (task) => task.kanbanId === toKanbanId,
        )[destination.index]?.id
        if (fromTaskId === toTaskId) {
          return
        }
        reorderTask({
          fromId: fromTaskId,
          referenceId: toTaskId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? 'after'
              : 'before',
          fromKanbanId,
          toKanbanId,
        })
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask],
  )
}

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
