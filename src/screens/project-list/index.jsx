import React, { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils/index'

export const ProjectList = () => {
  const apiPath = process.env.REACT_APP_API_URL
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(`${apiPath}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json())
        }
      },
    )
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiPath}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}
