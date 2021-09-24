import React from 'react'
import { List, Popover, Typography } from 'antd'
import styled from '@emotion/styled'
import { useUsers } from 'screens/project-list/users'

export const UserPopover = () => {
  // 获取收藏项目
  const { data: users, isLoading, refetch } = useUsers()

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>组员</Typography.Text>
      <List loading={isLoading}>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  )
  return (
    <Popover
      placement={'bottom'}
      content={content}
      onVisibleChange={(visible) => visible && refetch()}
    >
      <span>组员</span>
    </Popover>
  )
}
// 声明的元素必须大写字母开头，否则报错：类型“JSX.IntrinsicElements”上不存在属性 xxx
const ContentContainer = styled.div`
  width: 25rem;
`
