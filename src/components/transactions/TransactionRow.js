import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import {
  TableRow,
  TableCell,
  Text,
  Timer,
  IdentityBadge,
  TransactionBadge,
  TokenBadge,
} from '@aragon/ui'
import styled from 'styled-components'

const TransactionRow = ({ transaction, smallViewMode }) => {
  const { state } = useContext(StoreContext)
  let [timeStamp, setTimeStamp] = useState()
  let [ethValue, setEthValue] = useState()
  const { hash, timestamp, from, to, value } = transaction
  useEffect(() => {
    setEthValue(() => state.web3.utils.fromWei(value, 'ether'))
  }, [])

  if (smallViewMode) {
    return (
      <TableRow>
        <StyledTableCell>
          <Grid>
            <div css="overflow: hidden; margin-top: 5px">
              <div css="display: flex">
                <TransactionBadge
                  transaction={hash}
                  onClick={() => {
                    console.log('hello')
                  }}
                />
              </div>
            </div>
            <ValueContainer>
              <Text>{ethValue}</Text>
            </ValueContainer>
            <FromContainer>
              <IdentityBadge entity={from} badgeOnly={true} />
            </FromContainer>
            <ToContainer>
              <IdentityBadge entity={to} badgeOnly={true} />
            </ToContainer>
          </Grid>
        </StyledTableCell>
      </TableRow>
    )
  }

  return (
    <TableRow>
      <TableCell>
        <TransactionBadge
          transaction={hash}
          onClick={() => {
            console.log('hello')
          }}
        />
      </TableCell>
      <TableCell>
        <IdentityBadge entity={from} badgeOnly={true} />
      </TableCell>
      <TableCell>
        <IdentityBadge entity={to} badgeOnly={true} />
      </TableCell>
      <TableCell>
        <Text>{ethValue}</Text>
      </TableCell>
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
const TextOverflow = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const ValueContainer = styled.span`
  margin-top: 5px;
`

const ToContainer = styled.span`
  margin-top: 5px;
`

const FromContainer = styled.span`
  margin-top: 5px;
`
