import { useMemo, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from 'utils'

/**
 * 返回页面url中指定键的参数值
 */
export const useQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string
        },
      [searchParams, stateKeys],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params)
    },
    // as const 可以把类型转为静态类型
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (params: { [k in string]: unknown }) => {
    const o = cleanObject({
      // iterator 遍历器  遍历了iterator的对象都可以使用Object.fromEntries转换为对象
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit

    return setSearchParams(o)
  }
}
