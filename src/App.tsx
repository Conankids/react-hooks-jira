import { AuthEnticatedApp } from 'authenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageError } from 'components/lib'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { UnAuthEnticatedApp } from 'unauthenticated-app'
import './App.css'

function App(): JSX.Element {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthEnticatedApp /> : <UnAuthEnticatedApp />}
      </ErrorBoundary>
    </div>
  )
}
export default App
