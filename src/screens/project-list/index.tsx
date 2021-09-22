import React from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce /*, useArray */ } from 'utils/index'
import { useProjects } from './project'
import { useUsers } from './users'
import { Row } from 'antd'
import { useProjectModel, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorText, ScreenContainer } from 'components/lib'

export const ProjectList = () => {
  // !useHook中：基本类型，可以放在依赖里；组件状态可以放在依赖里；非组件状态的对象，决不能放在依赖里
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 300))
  // const persons: { name: string; age: number }[] = [
  //   { name: 'jack', age: 25 },
  //   { name: 'li', age: 20 },
  // ]
  // const { value, add, removeIndex, clear } = useArray(persons)

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  const { data: users } = useUsers()
  const { open } = useProjectModel()
  return (
    <ScreenContainer>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={'link'} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorText error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  )
}
// ProjectList.whyDidYouRender = true
// const Container = styled.div`
//   padding: 3.2rem;
// `
