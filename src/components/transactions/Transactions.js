import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  useViewport,
  theme,
} from '@aragon/ui'
//import BlockRow from './BlockRow'
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group'
//import './styles.css'
import TransactionRow from './TransactionRow'
import styled from 'styled-components'

const Transactions = React.memo(({ blockNumber }) => {
  const { state, dispatch, actions } = useContext(StoreContext)
  let [transactions, setTransactions] = useState([])
  //let [dataFetched, setDataFetched] = useState(false)

  useEffect(() => {
    if (blockNumber) {
      let ret = []
      async function getBlocks() {
        let { transactions } = await state.web3.eth.getBlock(blockNumber, true)
        console.log('traaan', transactions)
        console.log('tran length ', transactions.length)
        let filteredTransactions = transactions.filter(({ value }) => value > 0)
        setTransactions(prev => filteredTransactions)
        //setTransactions(blockList => [...blockList, block])
      }
      getBlocks()
    }
  }, [blockNumber])

  return blockNumber ? (
    <Table
      header={
        <TableRow>
          <TableHeader title="Hash" css="width: 20%" />
          <TableHeader title="From" css="width: 20%" />
          <TableHeader title="To" css="width: 20%" />
          <TableHeader title="Value" css="width: 20%" />
        </TableRow>
      }
      css={`
        color: ${theme.textPrimary};
        margin-bottom: 20px;
      `}
    >
      {/* <TransitionGroup exit={false}> */}
      {transactions &&
        transactions.map((trx, index) => (
          // const { number, timestamp } = block //destructuring
          // <CSSTransition key={block.hash} timeout={300} classNames="item">

          <TransactionRow transaction={trx} key={trx.hash} />

          // </CSSTransition>
        ))}
      {/* </TransitionGroup> */}
    </Table>
  ) : (
    <div> </div>
  )
})
export default Transactions
