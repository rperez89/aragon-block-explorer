import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Text,
  useViewport,
  theme,
  Timer,
  IdentityBadge,
} from '@aragon/ui'
import useInterval from '../../utils/useInterval'

const BlockRow = ({ block }) => {
  let [timeStamp, setTimeStamp] = useState()
  const { number, transactions, timestamp, miner } = block

  useEffect(() => {
    setTimeStamp(timeStamp => new Date(timestamp * 1000))
  }, [])

  // useInterval(() => {
  //   setTimeStamp(timestamp => Math.round(+new Date() / 1000) - block.timestamp)
  // }, 2000)

  return (
    <TableRow>
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
      {/* <TableCell>
        <Text>{miner}</Text>
      </TableCell> */}
      <TableCell>
        <IdentityBadge entity={miner} badgeOnly={true} />
      </TableCell>
    </TableRow>
  )
}
export default BlockRow
