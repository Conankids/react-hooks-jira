import { useCallback, useReducer, useState } from 'react'
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountRef = useMountedRef()

  return useCallback(
    (...args: T[]) => (mountRef.current ? dispatch(...args) : void 0),
    [dispatch, mountRef],
  )
}

// async hooks
export const useAsync = <D>(initState?: State<D>, initConfig?: Config) => {
  const { throwAsyncError } = { ...defaultConfig, ...initConfig }
  const [state, dispatch] = useReducer(
    // 调用dispatch时会调用该函数，dispatch中传递的值会覆盖state并更新state
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    { ...defaultState, ...initState },
  )
  // useState初始化时会自动调用一次初始化函数并把结果赋值给state作为初始值
  const [retry, setRetry] = useState(() => () => {})
  const safeDispatch = useSafeDispatch(dispatch)
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch],
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null,
      }),
    [safeDispatch],
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
      safeDispatch({ stat: 'loading' })
      try {
        const data = await promise
        setData(data)
        return data
      } catch (error) {
        setError(error as Error)
        if (throwAsyncError) return Promise.reject(error)
        return error
      }
    },
    [throwAsyncError, setError, safeDispatch, setData],
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
