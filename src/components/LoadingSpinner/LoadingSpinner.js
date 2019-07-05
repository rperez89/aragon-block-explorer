import React from 'react'
import styled, { keyframes } from 'styled-components'
//  import { keyframes } from 'styled-components'
import { theme } from '@aragon/ui'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingSpinner = React.memo(function LoadingSpinner({ paused }) {
  return (
    <Span1>
      <Span2>
        <Span3 />
      </Span2>
    </Span1>
  )
})

export default LoadingSpinner

const Span1 = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 82px;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: ${spin};
`
const Span2 = styled.span`
  position: relative;
  width: 40px;
  height: 100%;
  overflow: hidden;
`
const Span3 = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 5px solid ${theme.accent};
`
