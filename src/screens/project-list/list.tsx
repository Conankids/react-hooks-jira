import React from 'react'
import { User } from './search-panel'
import { Table } from 'antd'
import dayjs from 'dayjs'

interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
}

interface ListProp {
  list: Project[]
  users: User[]
}

export const List = ({ list, users }: ListProp) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      dataSource={list}
    ></Table>
  )
}
