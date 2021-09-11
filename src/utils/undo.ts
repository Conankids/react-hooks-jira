import { useCallback, useState } from 'react'
// 低配入门版reducer
export const useUndo = <T>(initPresent: T) => {
  const [state, setState] = useState({
    past: <T[]>[],
    present: initPresent,
    future: <T[]>[],
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  // 时光回溯
  const undo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState
      if (past.length === 0) return prevState
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future],
      }
    })
  }, [])

  // 时光前行
  const redo = useCallback(() => {
    setState((prevState) => {
      const { past, present, future } = prevState
      if (future.length === 0) return prevState
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      }
    })
  }, [])

  // 设置新值
  const set = useCallback((newPresent: T) => {
    setState((prevState) => {
      const { past, present } = prevState
      if (newPresent === present) return prevState
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    })
  }, [])

  // 重置
  const reset = useCallback((newPresent: T) => {
    setState(() => ({
      past: [],
      present: newPresent,
      future: [],
    }))
  }, [])

  // hook中返回函数需要用useCallback导出
  return [
    state,
    {
      undo,
      redo,
      set,
      reset,
      canRedo,
      canUndo,
    },
  ] as const
}
