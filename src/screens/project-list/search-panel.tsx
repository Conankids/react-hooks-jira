import React from 'react'
import { Form, Input, Select } from 'antd'

export interface User {
  id: number
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

export const SearchPanel = ({
  param,
  users,
  setParam,
}: SearchPanelProps): JSX.Element => {
  return (
    <Form>
      <Form.Item>
        <Input
          type={'text'}
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue={''}
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
