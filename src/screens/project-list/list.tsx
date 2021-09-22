import React from 'react'
import { Dropdown, Menu, Table, TableProps, Modal } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from './project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModel, useProjectsQueryKey } from './util'
import { Project } from 'types/project'
import { User } from 'types/user'

interface ListProp extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProp) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  // 巧用函数柯里化实现多参数调用
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

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
          render(value, project) {
            return <More key={project.id} project={project} />
          },
        },
      ]}
      {...props}
    ></Table>
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModel()
  const editProject = (id: number) => () => startEdit(id)

  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({ id })
      },
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={project.id + 'edit'}>
            <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key={project.id + 'delete'}>
            <ButtonNoPadding
              onClick={() => {
                confirmDeleteProject(project.id)
              }}
              type={'link'}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
