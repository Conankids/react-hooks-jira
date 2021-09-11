import React from 'react'
import { Divider, List, Popover, Typography } from 'antd'
import { useProjects } from 'screens/project-list/project'
import styled from '@emotion/styled'

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
  // 获取收藏项目
  const { data: projects, isLoading, retry } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List loading={isLoading}>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {props.projectButton}
    </ContentContainer>
  )
  return (
    <Popover
      placement={'bottom'}
      content={content}
      onVisibleChange={(visible) => visible && retry()}
    >
      <span>项目</span>
    </Popover>
  )
}
// 声明的元素必须大写字母开头，否则报错：类型“JSX.IntrinsicElements”上不存在属性 xxx
const ContentContainer = styled.div`
  width: 25rem;
`
