import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import { TableRow, TableCell, Text, Timer, IdentityBadge } from '@aragon/ui'
import styled from 'styled-components'

const BlockRow = ({ block, smallViewMode }) => {
  const { dispatch } = useContext(StoreContext)
  let [timeStamp, setTimeStamp] = useState()
  const { number, transactions, timestamp, miner } = block

  useEffect(() => {
    setTimeStamp(timeStamp => new Date(timestamp * 1000))
  }, [])

  if (smallViewMode) {
    return (
      <TableRow>
        <StyledTableCell>
          <Grid>
            <div css="overflow: hidden; margin-top: 5px">
              <div css="display: flex">
                <Text>{number}</Text>
              </div>
            </div>
            <TimerContainer>
              <Timer start={timeStamp} showEmpty={false} />
            </TimerContainer>
            <TrxContainer>
              <Text>{transactions && transactions.length + ` Trx`}</Text>
            </TrxContainer>
            <MinerContainer>
              <IdentityBadge entity={miner} />
            </MinerContainer>
          </Grid>
        </StyledTableCell>
      </TableRow>
    )
  }

  return (
    <TableRow
      onClick={() => {
        dispatch({ type: types.SELECT_BLOCK, payload: block.number })
      }}
    >
      <TableCell>
        <Text>{number}</Text>
      </TableCell>
      <TableCell>
        <Text>{transactions && transactions.length}</Text>
      </TableCell>
      <TableCell>
        <Text>
          <Timer start={timeStamp} showEmpty={false} />
        </Text>
      </TableCell>
      <TableCell>
        <IdentityBadge entity={miner} />
      </TableCell>
    </TableRow>
  )
}
export default BlockRow

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
const TrxContainer = styled.span`
  margin-top: 5px;
`
const MinerContainer = styled.span`
  margin-top: 5px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  grid-column-gap: 10px;
  width: 100%;
  ${TrxContainer},
  ${MinerContainer} {
    text-align: right;
  }
`
const TimerContainer = styled.span`
  margin-top: 5px;
`
