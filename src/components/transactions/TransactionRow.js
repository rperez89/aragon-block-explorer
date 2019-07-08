import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import {
  TableRow,
  TableCell,
  Text,
  IdentityBadge,
  Modal,
  theme,
} from '@aragon/ui'
import styled from 'styled-components'
import TransactionBadge from '../TransactionBadge/TransactionBadge'

const TransactionRow = ({ transaction, smallViewMode }) => {
  const { state } = useContext(StoreContext)
  const [opened, setOpened] = useState(false)
  let [ethValue, setEthValue] = useState()
  const { hash, from, to, value, blockNumber, gas } = transaction
  console.log('transaction', transaction)
  useEffect(() => {
    setEthValue(() => state.web3.utils.fromWei(value, 'ether'))
  }, [])

  const getModal = () => {
    return (
      <Modal visible={opened} onClose={() => setOpened(false)} width={'850px'}>
        <Part>
          <Title>Transaction Info</Title>

          <ul>
            <InfoRow>
              <span>Block Hash</span>
              <span>:</span>
              <strong>{hash}</strong>
            </InfoRow>
            <InfoRow>
              <span>From</span>
              <span>:</span>
              <strong>{from}</strong>
            </InfoRow>
            <InfoRow>
              <span>To</span>
              <span>:</span>
              <strong>{to}</strong>
            </InfoRow>
            <InfoRow>
              <span>Block Number</span>
              <span>:</span>
              <strong>{blockNumber}</strong>
            </InfoRow>
            <InfoRow>
              <span>Gas</span>
              <span>:</span>
              <strong>{gas}</strong>
            </InfoRow>
          </ul>
        </Part>
      </Modal>
    )
  }
  if (smallViewMode) {
    return (
      <TableRow>
        <StyledTableCell>
          <Grid>
            <div css="overflow: hidden; margin-top: 5px">
              <div css="display: flex">
                <TransactionBadge hash={hash} onClick={() => setOpened(true)} />
              </div>
            </div>
            <ValueContainer>
              <Text>{ethValue}</Text>
            </ValueContainer>
            <FromContainer>
              <IdentityBadge entity={from} badgeOnly />
            </FromContainer>
            <ToContainer>
              <IdentityBadge entity={to} badgeOnly />
            </ToContainer>
          </Grid>
        </StyledTableCell>
        {getModal()}
      </TableRow>
    )
  }

  return (
    <TableRow>
      <TableCell>
        <TransactionBadge hash={hash} onClick={() => setOpened(true)} />
      </TableCell>
      <TableCell>
        <IdentityBadge entity={from} badgeOnly />
      </TableCell>
      <TableCell>
        <IdentityBadge entity={to} badgeOnly />
      </TableCell>
      <TableCell>
        <Text>{ethValue}</Text>
      </TableCell>
      {getModal()}
    </TableRow>
  )
}
export default TransactionRow

const StyledTableCell = styled(TableCell)`
  max-width: 0;
  width: 100%;
  overflow: hidden;

  &&& {
    :first-child,
    :last-child {
      border-radius: 0;
    }
  }
`
const FromContainer = styled.span`
  margin-top: 5px;
`

const ToContainer = styled.span`
  margin-top: 5px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10px;
  width: 100%;
  ${FromContainer},
  ${ToContainer} {
    text-align: right;
  }
`
const ValueContainer = styled.span`
  margin-top: 5px;
`
const InfoRow = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  list-style: none;

  > span:nth-child(1) {
    font-weight: 400;
    color: ${theme.textSecondary};
  }
  > span:nth-child(2) {
    opacity: 0;
    width: 10px;
  }
  > span:nth-child(3) {
    flex-shrink: 1;
  }
  > strong {
    text-transform: uppercase;
  }
`
const Part = styled.section`
  margin-bottom: 55px;
`
const Title = styled.h1`
  margin-bottom: 15px;
  text-transform: lowercase;
  line-height: 30px;
  font-variant: small-caps;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid ${theme.contentBorder};
`
