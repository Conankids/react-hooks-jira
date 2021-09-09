import { Select } from 'antd'
import React from 'react'
import { Raw } from 'types'

interface IdSelectProps
  extends Omit<
    React.ComponentProps<typeof Select>,
    'value' | 'onChange' | 'defaultOptionName' | 'options'
  > {
  value: Raw | undefined | null
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

/**
 * 实现功能：
 * * 1. value 可以传入多种类型的值
 * * 2. onChange 只会回调number|undefined类型
 * * 3、当 isNaN(Number(value))为true的时候，代表选择默认类型
 * * 4、当选择默认类型的时候，onChange会回调undefined
 */

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
