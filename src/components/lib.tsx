import React from 'react'
import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'
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
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    <DevTools />
  </FullPage>
)
