import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import {
  TableRow,
  TableCell,
  Text,
  IdentityBadge,
  TransactionBadge,
} from '@aragon/ui'
import styled from 'styled-components'

const TransactionRow = ({ transaction, smallViewMode }) => {
  const { state } = useContext(StoreContext)
  let [ethValue, setEthValue] = useState()
  const { hash, from, to, value } = transaction
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
              <IdentityBadge entity={from} badgeOnly />
            </FromContainer>
            <ToContainer>
              <IdentityBadge entity={to} badgeOnly />
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
        <IdentityBadge entity={from} badgeOnly />
      </TableCell>
      <TableCell>
        <IdentityBadge entity={to} badgeOnly />
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
