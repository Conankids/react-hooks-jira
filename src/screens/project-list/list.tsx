import React from 'react'
import { User } from './search-panel'
import { Popover, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from './project'
export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin: boolean
}

interface ListProp extends TableProps<Project> {
  users: User[]
  refresh?: () => void
  projectButton: JSX.Element
}

export const List = ({ users, refresh, ...props }: ListProp) => {
  const { mutate } = useEditProject()
  // 巧用函数柯里化实现多参数调用
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh)
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          },
        },
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
        {
          title: '其他',
          key: 'other',
          render() {
            return (
              <Popover placement={'bottom'} content={props.projectButton}>
                ...
              </Popover>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
