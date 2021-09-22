import styled from '@emotion/styled'
import { ScreenContainer } from 'components/lib'
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: curProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  return (
    <ScreenContainer>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  )
}

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
