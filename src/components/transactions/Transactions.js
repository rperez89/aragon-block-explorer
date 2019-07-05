import React, { useContext, useState, useEffect, useCallback } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Table, TableHeader, TableRow, useViewport, theme } from '@aragon/ui'
import TransactionRow from './TransactionRow'
import styled from 'styled-components'
import './styles.css'
import Pager from '../Pager/Pager'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const Transactions = React.memo(({ blockNumber }) => {
  const { state } = useContext(StoreContext)
  let [dataFetched, setDataFetched] = useState(false)
  let [transactions, setTransactions] = useState([])
  let [pagesNumber, setPagesNumber] = useState()
  let [currentPage, setCurrentPage] = useState(1)
  const { below } = useViewport()
  const compactMode = below('medium')
  const { contentBorder } = theme

  useEffect(() => {
    async function getBlocks() {
      let { transactions } = await state.web3.eth.getBlock(blockNumber, true)
      let filteredTransactions = transactions.filter(({ value }) => value > 0)
      setTransactions(prev => filteredTransactions)
      setPagesNumber(number => Math.ceil(filteredTransactions.length / 10))
    }
    if (blockNumber) {
      getBlocks()
    }
  }, [blockNumber])

  useEffect(() => {
    if (pagesNumber > 0) {
      setDataFetched(true)
    }
  }, [pagesNumber])

  const handleOnNext = useCallback(() => {
    setCurrentPage(page => page + 1)
  }, [pagesNumber])

  const handleOnPrevious = useCallback(() => {
    setCurrentPage(page => page - 1)
  }, [pagesNumber])

  return blockNumber ? (
    <>
      {dataFetched ? (
        <Right>
          <TitleContainer contentBorder={contentBorder}>
            <Title>{`Transactions From Block: ${blockNumber}`}</Title>
          </TitleContainer>
          <Table
            header={
              !compactMode && (
                <TableRow>
                  <TableHeader title="Hash" css="width: 20%" />
                  <TableHeader title="From" css="width: 20%" />
                  <TableHeader title="To" css="width: 20%" />
                  <TableHeader title="Value (Eth)" css="width: 20%" />
                </TableRow>
              )
            }
            css={`
              color: ${theme.textPrimary};
              margin-bottom: 20px;
            `}
          >
            {transactions &&
              transactions
                .slice(currentPage * 10 - 10, currentPage * 10)
                .map((trx, index) => (
                  <TransactionRow
                    transaction={trx}
                    key={trx.hash}
                    smallViewMode={compactMode}
                  />
                ))}
          </Table>
          <Footer contentBorder={contentBorder}>
            <Pager
              onNext={handleOnNext}
              onPrevious={handleOnPrevious}
              totalPages={pagesNumber}
              currentPage={currentPage}
            />
          </Footer>
        </Right>
      ) : (
        <SpinnerContainer>
          <LoadingSpinner />
        </SpinnerContainer>
      )}
    </>
  ) : (
    <div />
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
  @media (max-width: 1170px) {
    width: 100%;
  }
`
const Footer = styled.div`
  border-bottom: 1px solid ${p => p.contentBorder};
  height: 50px;
  margin-bottom: 5px;
`
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45vw;
`
