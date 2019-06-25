import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import { TableRow, TableCell, Text, Timer, IdentityBadge } from '@aragon/ui'

const BlockRow = ({ block }) => {
  const { state, dispatch, actions } = useContext(StoreContext)
  let [timeStamp, setTimeStamp] = useState()
  const { number, transactions, timestamp, miner } = block

  useEffect(() => {
    setTimeStamp(timeStamp => new Date(timestamp * 1000))
  }, [])

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
