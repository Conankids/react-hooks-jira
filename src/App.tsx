import { AuthEnticatedApp } from 'authenticated-app'
import { useAuth } from 'context/auth-context'
import React from 'react'
import { UnAuthEnticatedApp } from 'unauthenticated-app'
import './App.css'

function App(): JSX.Element {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? (
        <div>
          <AuthEnticatedApp />
        </div>
      ) : (
        <UnAuthEnticatedApp />
      )}
    </div>
  )
}
export default App
