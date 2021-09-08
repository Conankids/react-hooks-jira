/** @jsxImportSource @emotion/react */

import React from 'react'
import { Form, Input, Select } from 'antd'
export interface User {
  id: string
  name: string
  token: string
}

interface SearchPanelProps {
  param: {
    name: string
    personId: string
  }
  users: User[]
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(personId) => setParam({ ...param, personId })}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
