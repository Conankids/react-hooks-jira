import styled from '@emotion/styled'
import { Button, Drawer, DrawerProps, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorText } from 'components/lib'
import React, { useEffect } from 'react'
import { useProjectIdInUrl } from 'screens/kanban/util'
import { useAddEpic } from 'utils/epic'
import { useEpicsQueryKey } from './util'

export const CreateEpic = (
  props: Pick<DrawerProps, 'visible'> & { onClose: () => void },
) => {
  const projectId = useProjectIdInUrl()
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey())
  const [form] = useForm()
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId })
    props.onClose()
  }

  useEffect(() => {
    form.resetFields()
  }, [form, props.visible])

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={'100%'}
    >
      <Container>
        <h1>新建任务组</h1>
        <ErrorText error={error} />
        <Form
          form={form}
          layout={'vertical'}
          style={{ width: '40rem' }}
          onFinish={onFinish}
        >
          <Form.Item
            label={'任务组名'}
            name={'name'}
            rules={[{ required: true, message: '请输入任务组名' }]}
          >
            <Input placeholder={'请输入任务组名'} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button loading={isLoading} type={'primary'} htmlType={'submit'}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
