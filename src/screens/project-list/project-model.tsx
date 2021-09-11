import { Button, Drawer } from 'antd'
import React from 'react'

export const ProjectModel = (props: {
  projectModelOpen: boolean
  onClose: () => void
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModelOpen}
      width={'100%'}
    >
      <h1>Project Model</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}
