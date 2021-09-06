import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const cleanObject = <T, U extends keyof T>(obj: T): Pick<T, U> => {
  const result = { ...obj }
  Object.keys(result).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay)
    // return函数运行时机
    // 1. 在组件卸载的时候运行
    // 2. 下次运行用useEffect的时候
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceValue
}

export const useArray = <T>(arr: T[]) => {
  const [value, setValue] = useState(arr)
  return {
    value,
    setValue,
    clear: () => {
      setValue([])
    },
    removeIndex: (i: number) => {
      const copy = [...arr]
      copy.splice(i, 1)
      setValue(copy)
    },
    add: (item: T) => {
      setValue([...value, item])
    },
  }
}
