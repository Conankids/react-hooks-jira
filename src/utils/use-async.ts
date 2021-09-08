import { useState } from 'react'

// 接口
interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'success' | 'error'
}

interface Config {
  throwAsyncError: boolean
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
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null,
    })

  const run = async (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入一个Promise类型数据')
    }
    setState({ ...state, stat: 'loading' })
    try {
      const data = await promise
      setData(data)
      return data
    } catch (error) {
      setError(error as Error)
      if (throwAsyncError) return Promise.reject(error)
      return error
    }
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    run,
    setData,
    setError,
    ...state,
  }
}
