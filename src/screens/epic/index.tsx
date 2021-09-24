import { Button, List, Modal } from 'antd'
import { Row, ScreenContainer } from 'components/lib'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectInUrl } from 'screens/kanban/util'
import { useDeleteEpic, useEpics } from 'utils/epic'
import { useTasks } from 'utils/task'
import { CreateEpic } from './create-epic'
import { useEpicSearchParams, useEpicsQueryKey } from './util'

export const EpicScreen = () => {
  const { data: curProject } = useProjectInUrl()
  const { data: epics } = useEpics(useEpicSearchParams())
  const { data: tasks } = useTasks({ projectId: curProject?.id })
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey())
  const [epicScreenVisible, setEpicScreenVisible] = useState(false)
  const startDelete = (id: number) => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务组吗?',
      onOk: () => {
        deleteEpic({ id })
      },
    })
  }
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{curProject?.name}任务组</h1>
        <Button
          type={'link'}
          onClick={() => {
            setEpicScreenVisible(true)
          }}
        >
          新建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: 'auto' }}
        dataSource={epics}
        itemLayout={'vertical'}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button onClick={() => startDelete(epic.id)} type={'link'}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                  <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                </div>
              }
            ></List.Item.Meta>
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <p key={task.id}>
                    <Link
                      to={`/projects/${curProject?.id}/kanban?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  </p>
                ))}
            </div>
          </List.Item>
        )}
      ></List>
      <CreateEpic
        onClose={() => setEpicScreenVisible(false)}
        visible={epicScreenVisible}
      />
    </ScreenContainer>
  )
}
