import { useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
import { useAsync } from 'utils/use-async'
import { useDocumentTitle } from 'utils'

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwAsyncError: true })
  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    run(register(values)).catch(onError)
  }
  useDocumentTitle('注册', false)
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
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请重新输入密码' }]}
      >
        <Input.Password placeholder={'确认密码'} />
      </Form.Item>
      <Form.Item>
        <LongBtn loading={isLoading} htmlType="submit" type={'primary'}>
          注册
        </LongBtn>
      </Form.Item>
    </Form>
  )
}

const LongBtn = styled(Button)`
  width: 100%;
`
