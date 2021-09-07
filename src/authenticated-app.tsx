import React from 'react'
import { ProjectList } from 'screens/project-list'
import styled from '@emotion/styled'
import { useAuth } from 'context/auth-context'
import { Row } from 'components/lib'

export const AuthEnticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>退出登录</button>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
  height: 100vh;
`

const PageHeader = styled(Row)`
  height: 6rem;
`
const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
