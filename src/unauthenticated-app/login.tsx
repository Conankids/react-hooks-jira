import { useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
import { useAsync } from 'utils/use-async'
import { useDocumentTitle } from 'utils'

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, {
    throwAsyncError: true,
  })
  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError)
  }
  useDocumentTitle('登录', false)
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder={'密码'} />
      </Form.Item>
      <Form.Item>
        <LongBtn loading={isLoading} htmlType="submit" type={'primary'}>
          登录
        </LongBtn>
      </Form.Item>
    </Form>
  )
}

const LongBtn = styled(Button)`
  width: 100%;
`
