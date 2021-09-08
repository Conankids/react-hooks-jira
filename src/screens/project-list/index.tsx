import React, { useState } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce /*, useArray */ } from 'utils/index'
import styled from '@emotion/styled'
import { useProjects } from './project'
import { useUsers } from './users'
import { Typography } from 'antd'

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceParam = useDebounce(param, 300)
  const { isLoading, error, data: list } = useProjects(debounceParam)
  // const persons: { name: string; age: number }[] = [
  //   { name: 'jack', age: 25 },
  //   { name: 'li', age: 20 },
  // ]
  // const { value, add, removeIndex, clear } = useArray(persons)

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
