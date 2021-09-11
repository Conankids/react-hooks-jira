import { useCallback, useReducer } from 'react'

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[]
  present: T
  future: T[]
}

type Action<T> = {
  newPresent?: T
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state
  const { type, newPresent } = action
  switch (type) {
    case UNDO:
      if (past.length === 0) return state
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present, ...future],
      }
    case REDO:
      if (future.length === 0) return state
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      }
    case SET:
      if (newPresent === present) return state
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      }
  }
}

export const useUndo2 = <T>(initPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initPresent,
    future: [],
  } as State<T>)

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    dispatch({ type: UNDO })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: REDO })
  }, [])

  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: RESET })
  }, [])

  return [state, { undo, redo, set, reset, canUndo, canRedo }] as const
}
