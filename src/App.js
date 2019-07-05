import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from './context/StoreContext'
import styled from 'styled-components'
import { Main, AppView, breakpoint, Viewport } from '@aragon/ui'
import './App.css'
import { useWeb3 } from './utils/getWeb3'
import Blocks from './components/blocks/Blocks'
import Transactions from './components/transactions/Transactions'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

function App() {
  const { state } = useContext(StoreContext)

  useWeb3(() => {}, [])

  let [blockList, setBlockList] = useState([])
  let [dataFetched, setDataFetched] = useState(false)

  useEffect(() => {
    async function getBlocks() {
      for (let i = 0; i < 10; i++) {
        let block = await state.web3.eth.getBlock(state.blockNumber - i)
        setBlockList(blockList => [...blockList, block])
      }
    }
    if (state.blockNumber) {
      getBlocks()
    }
  }, [state.blockNumber])

  useEffect(() => {
    if (blockList.length === 10) {
      setDataFetched(true)
    }
  }, [blockList])

  useEffect(() => {
    if (dataFetched) {
      let subscription
      if (state.web3) {
        subscription = state.web3.eth
          .subscribe('newBlockHeaders')
          .on('data', function(blockHeader) {
            state.web3.eth.getBlock(blockHeader.number, function(
              error,
              result
            ) {
              if (!error) {
                setBlockList(prev => {
                  let ret = prev.slice(0, 9)
                  ret.unshift(result)
                  return ret
                })
              }
            })
          })
        return () => {
          subscription.unsubscribe(function(error, success) {
            if (!error) console.log('Successfully unsubscribed!')
          })
        }
      }
    }
  }, [dataFetched])

  console.log('SELECTED ', state.selectedBlock)
  return (
    <Main>
      <AppView title="Block Explorer">
        <Viewport>
          {({ below }) => {
            const compactTable = below('medium')
            console.log('compactTable', compactTable)
            if (!dataFetched) {
              return (
                <SpinnerContainer>
                  <LoadingSpinner />
                </SpinnerContainer>
              )
            }
            return (
              <Container id={'container'}>
                <Left>{dataFetched && <Blocks blockList={blockList} />}</Left>
                <Separator />

                <Transactions blockNumber={state.selectedBlock} />
              </Container>
            )
          }}
        </Viewport>
      </AppView>
    </Main>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint(
    'large',
    `
      display: flex;
      flex-direction: row
    `
  )};
`
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
const Left = styled.div`
  width: 45%;
  @media (max-width: 1170px) {
    width: 100%;
  }
`
const Separator = styled.div`
  width: 5vw;
`
export default App
