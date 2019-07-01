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
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import './styles.css'
import Pager from '../Pager/Pager'

const Transactions = React.memo(({ blockNumber }) => {
  const { state, dispatch, actions } = useContext(StoreContext)
  let [transactions, setTransactions] = useState([])
  //let [dataFetched, setDataFetched] = useState(false)
  const { contentBorder } = theme

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

  const handleOnNext = () => {
    console.log('Next')
  }

  return blockNumber ? (
    <>
      <Right>
        <TitleContainer contentBorder={contentBorder}>
          <Title>{'Transactions From Block: '}</Title>
        </TitleContainer>
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
            transactions.slice(0, 10).map((trx, index) => (
              // const { number, timestamp } = block //destructuring
              // <CSSTransition key={block.hash} timeout={300} classNames="item">

              <TransactionRow transaction={trx} key={trx.hash} />

              // </CSSTransition>
            ))}
          {/* </TransitionGroup> */}
        </Table>
        <Footer contentBorder={contentBorder}>
          {/* <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={2}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={() => {}}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          /> */}
          <Pager onNext={handleOnNext}></Pager>
        </Footer>
      </Right>
    </>
  ) : (
    <div> </div>
  )
})
export default Transactions

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 600;
  margin: ${p => (p.compactMode ? '20px 20px 10px 20px' : '30px 30px 5px 0')};
`
const TitleContainer = styled.div`
  border-bottom: 1px solid ${p => p.contentBorder};
  margin-bottom: 15px;
`

const Right = styled.div`
  width: 45vw;
`
const Footer = styled.div`
  border-bottom: 1px solid ${p => p.contentBorder};
  height: 50px;
  margin-bottom: 5px;
`
