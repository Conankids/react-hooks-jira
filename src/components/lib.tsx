import React from 'react'
import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  justify-content: ${(props) =>
    props.between === true ? 'space-between' : undefined};
  align-items: center;
  margin-bottom: ${(props) =>
    typeof props.marginBottom !== 'undefined' && props.marginBottom + 'rem'};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined};
  }
`

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={'large'} />
  </FullPage>
)

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorText error={error} />
    <DevTools />
  </FullPage>
)

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`
// eslint-disable-next-line
const isError = (value: any): value is Error => value?.message

export const ErrorText = ({ error }: { error: unknown }) =>
  isError(error) ? (
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
  ) : null

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
