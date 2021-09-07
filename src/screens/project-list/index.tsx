import React, { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useMount, useDebounce /*, useArray */ } from 'utils/index'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'

export const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 300)
  const client = useHttp()

  // const persons: { name: string; age: number }[] = [
  //   { name: 'jack', age: 25 },
  //   { name: 'li', age: 20 },
  // ]
  // const { value, add, removeIndex, clear } = useArray(persons)

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  useEffect(() => {
    console.log(debounceParam)
    client('projects', {
      method: 'GET',
      data: cleanObject(debounceParam),
    }).then(setList)
  }, [debounceParam])

  useMount(() => {
    client('users').then(setUsers)
    // add({ name: 'lan', age: 17 })
    // removeIndex(1)
    // clear()
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
