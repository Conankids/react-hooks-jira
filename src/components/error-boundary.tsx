import React, { Component } from 'react'

type FallbackRender = (props: { error: Error | null }) => JSX.Element

// 官方error-boundary：https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
  state = { error: null }

  // 当子组件抛出异常，这里会接受到并且调用,更新状态
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
