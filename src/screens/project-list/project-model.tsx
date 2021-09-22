import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorText } from 'components/lib'
import { UserSelect } from 'components/user-select'
import React, { useEffect } from 'react'
import { Project } from 'types/project'
import { useAddProject, useEditProject } from './project'
import { useProjectModel, useProjectsQueryKey } from './util'

export const ProjectModel = () => {
  const { projectModelOpen, close, editingProject, isLoading } =
    useProjectModel()
  const useMutationProject = editingProject ? useEditProject : useAddProject
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationProject(useProjectsQueryKey())

  const [form] = useForm()
  const onFinish = (
    values: Pick<Project, 'name' | 'organization' | 'personId'>,
  ) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModel = () => {
    form.resetFields()
    close()
  }

  const title = editingProject ? '编辑项目' : '创建项目'

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer
      forceRender={true}
      onClose={closeModel}
      visible={projectModelOpen}
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorText error={error} />
            <Form
              form={form}
              layout={'vertical'}
              style={{ width: '40rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label={'项目名'}
                name={'name'}
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input placeholder={'请输入项目名'} />
              </Form.Item>
              <Form.Item
                label={'部门'}
                name={'organization'}
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder={'请输入部门名'} />
              </Form.Item>
              <Form.Item label={'负责人'} name={'personId'}>
                <UserSelect defaultOptionName={'负责人'} />
              </Form.Item>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={mutateLoading}
                  type={'primary'}
                  htmlType={'submit'}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
