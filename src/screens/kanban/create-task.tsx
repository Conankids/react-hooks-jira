import { Button, Card, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAddTask } from 'utils/task'
import { useProjectIdInUrl, useTasksQueryKey } from './util'

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
  const submit = async () => {
    await addTask({ name, projectId, kanbanId })
    setInputMode(false)
    setName('')
  }
  const toggle = () => setInputMode((mode) => !mode)

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return (
      <Button type={'link'} onClick={toggle}>
        +创建事务
      </Button>
    )
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        autoFocus={true}
        placeholder={'需要做些什么'}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  )
}
