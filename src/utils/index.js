import { useEffect, useState } from 'react'

export const isFalsy = (value) => (value === 0 ? false : !value)

export const cleanObject = (obj) => {
  const result = { ...obj }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = (value, delay) => {
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
