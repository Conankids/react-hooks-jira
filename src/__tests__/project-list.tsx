import React, { ReactNode } from 'react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import fakeData from './fake.json'
import { render, screen, waitFor } from '@testing-library/react'
import { AppProviders } from 'context'
import { ProjectList } from 'screens/project-list'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

const apiUrl = process.env.REACT_APP_API_URL

const fakeAuth = {
  id: 1,
  name: 'jack',
  token: '123',
}

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => res(ctx.json(fakeAuth))),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = '', personId = undefined } = Object.fromEntries(
      req.url.searchParams,
    )
    const result = fakeData?.projects?.filter(
      (project) =>
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true),
    )
    return res(ctx.json(result))
  }),
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

const waitTable = () =>
  waitFor(() => expect(screen.getByText('骑手管理')).toBeInTheDocument(), {
    timeout: 3000,
  })

test('项目列表展示正常', async () => {
  renderScreen(<ProjectList />, { route: '/projects' })
  await waitTable()
  expect(screen.getAllByRole('row').length).toBe(fakeData.projects.length + 1)
})

test('搜索项目', async () => {
  renderScreen(<ProjectList />, { route: '/projects?name=骑手' })
  await waitTable()
  // 期望页面中有2个role或aria-role为row的元素
  expect(screen.getAllByRole('row').length).toBe(2)
  expect(screen.getByText('骑手管理')).toBeInTheDocument()
})

export const renderScreen = (ui: ReactNode, { route = '/projects' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(<AppProviders>{ui}</AppProviders>)
}
