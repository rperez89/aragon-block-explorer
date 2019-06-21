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
} from '@aragon/ui'
import useInterval from '../../utils/useInterval'

const BlockRow = ({ block }) => {
  let [timeStamp, setTimeStamp] = useState([])
  const { number, hash } = block

  useEffect(() => {
    setTimeStamp(timestamp => Math.round(+new Date() / 1000))
  }, [])

  useInterval(() => {
    setTimeStamp(timestamp => Math.round(+new Date() / 1000) - block.timestamp)
  }, 2000)

  console.log('number ', number)
  return (
    <TableRow>
      <TableCell>
        <Text>{block.number}</Text>
      </TableCell>
      <TableCell>
        <Text>{block.transactions.length}</Text>
      </TableCell>
      <TableCell>
        <Text>{timeStamp}</Text>
      </TableCell>
    </TableRow>
  )
}
export default BlockRow
