import { useCallback, useState } from 'react'
import { useMountedRef } from 'utils'

// 接口
interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'success' | 'error'
}

interface Config {
  throwAsyncError?: boolean
}

const defaultConfig: Config = {
  throwAsyncError: false,
}

const defaultState: State<null> = {
  error: null,
  data: null,
  stat: 'idle',
}

// async hooks
export const useAsync = <D>(initState?: State<D>, initConfig?: Config) => {
  const { throwAsyncError } = { ...defaultConfig, ...initConfig }
  const [state, setState] = useState({
    ...defaultState,
    ...initState,
  })
  // useState初始化时会自动调用一次初始化函数并把结果赋值给state作为初始值
  const [retry, setRetry] = useState(() => () => {})
  const mountRef = useMountedRef()
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null,
      }),
    [],
  )

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: 'error',
        data: null,
      }),
    [],
  )

  const run = useCallback(
    async (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入一个Promise类型数据')
      }
      // setState传入函数会被立即执行，所以保存函数的话需要多嵌套一层
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig)
        }
      })
      setState((prev) => ({ ...prev, stat: 'loading' }))
      try {
        const data = await promise
        if (mountRef.current) setData(data)
        return data
      } catch (error) {
        setError(error as Error)
        if (throwAsyncError) return Promise.reject(error)
        return error
      }
    },
    [throwAsyncError, mountRef, setData, setError],
  )
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    run,
    retry,
    setData,
    setError,
    ...state,
  }
}
