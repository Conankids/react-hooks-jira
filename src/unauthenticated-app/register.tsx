import { useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'

export const Register = () => {
  const { register } = useAuth()
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values)
  }
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
        <LongBtn htmlType="submit" type={'primary'}>
          注册
        </LongBtn>
      </Form.Item>
    </Form>
  )
}

const LongBtn = styled(Button)`
  width: 100%;
`
