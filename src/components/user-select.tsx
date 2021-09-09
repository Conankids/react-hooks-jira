import React from 'react'
import { useUsers } from 'screens/project-list/users'
import { IdSelect } from './id-select'

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers()
  return <IdSelect options={users || []} {...props}></IdSelect>
}
