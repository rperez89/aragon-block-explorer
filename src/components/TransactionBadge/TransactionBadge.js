import React from 'react'
import { Text } from '@aragon/ui'
import styled from 'styled-components'
import { shortenAddress } from '../../utils/getWeb3'

const TransactionBadge = ({ hash, onClick }) => {
  return (
    <Main onClick={onClick}>
      <Label size={'normal'}>{shortenAddress(hash)}</Label>
    </Main>
  )
}

export default TransactionBadge

const Main = styled.div`
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
  cursor: default;
  text-decoration: none;
  background: #daeaef;
  cursor: pointer;
`

const Label = styled(Text)`
  padding: 0 8px;
  white-space: nowrap;
`
