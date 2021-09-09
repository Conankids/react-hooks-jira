import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const cleanObject = (obj: Record<string, unknown>) => {
  const result = { ...obj }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [callback])
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef可以保存一个值，整个生命周期不会影响它
  const oldTitle = useRef(document.title).current
  // const [oldTitle] = useState(document.title)

  useEffect(() => {
    document.title = title
    console.log(title)
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [oldTitle, keepOnUnmount])
}

export const resetRoute = () => (window.location.href = window.location.origin)

/**
 * 返回组件挂载状态，如果组件未挂载或已卸载返回false，反之，返回true
 */
export const useMountedRef = () => {
  const didMount = useRef(false)
  useEffect(() => {
    didMount.current = true
    return () => {
      didMount.current = false
    }
  }, [])
  return didMount
}
