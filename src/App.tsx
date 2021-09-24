import { ErrorBoundary } from 'components/error-boundary'
import { FullPageError, FullPageLoading } from 'components/lib'
import { useAuth } from 'context/auth-context'
import React, { Suspense } from 'react'
import './App.css'

const UnAuthEnticatedApp = React.lazy(() => import('unauthenticated-app'))
const AuthEnticatedApp = React.lazy(() => import('authenticated-app'))

function App(): JSX.Element {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <AuthEnticatedApp /> : <UnAuthEnticatedApp />}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
export default App
