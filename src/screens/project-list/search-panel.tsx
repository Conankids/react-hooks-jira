/** @jsxImportSource @emotion/react */

import React from 'react'
import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import { Project } from 'types/Project'
import { User } from 'types/user'

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(personId) => setParam({ ...param, personId })}
        />
      </Form.Item>
    </Form>
  )
}
