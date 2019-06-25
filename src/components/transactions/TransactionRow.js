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

const TransactionRow = ({ transaction }) => {
  const { state } = useContext(StoreContext)
  let [timeStamp, setTimeStamp] = useState()
  let [ethValue, setEthValue] = useState()
  const { hash, timestamp, from, to, value } = transaction
  useEffect(() => {
    setEthValue(() => state.web3.utils.fromWei(value, 'ether'))
  }, [])
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
