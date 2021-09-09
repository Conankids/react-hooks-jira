import React from 'react'
import { User } from './search-panel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
}

interface ListProp extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProp) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <div>
                <Link to={String(project.id)}>{project.name}</Link>
              </div>
            )
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          key: 'personId',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
        {
          title: '创建时间',
          key: 'created',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
