import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/**
 * 返回页面url中指定键的参数值
 */
export const useQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => ({
            ...prev,
            [key]: searchParams.get(key) || '',
          }),
          {} as Record<K, string>,
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(
        cleanObject({
          // iterator 遍历器  遍历了iterator的对象都可以使用Object.fromEntries转换为对象
          ...Object.fromEntries(searchParams),
          ...params,
        }) as URLSearchParamsInit,
      )
    },
    // as const 可以把类型转为静态类型
  ] as const
}
