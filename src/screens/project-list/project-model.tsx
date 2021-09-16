import { Button, Drawer } from 'antd'
import React from 'react'
import { useProjectModel } from './util'

export const ProjectModel = () => {
  const { projectModelOpen, close } = useProjectModel()
  return (
    <Drawer onClose={close} visible={projectModelOpen} width={'100%'}>
      <h1>Project Model</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
