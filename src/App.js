import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from './context/StoreContext'
import styled, { css } from 'styled-components'
import { types } from './context/reducers'
import { Main, AppView, breakpoint, Viewport } from '@aragon/ui'
import './App.css'
import { useWeb3, unsubscribeWeb3 } from './utils/getWeb3'
import Blocks from './components/blocks/Blocks'
import Transactions from './components/transactions/Transactions'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

function App() {
  const { state, dispatch, actions } = useContext(StoreContext)

  useWeb3(() => {}, [])

  let [blockList, setBlockList] = useState([])
  let [dataFetched, setDataFetched] = useState(false)

  useEffect(() => {
    if (state.blockNumber) {
      let ret = []
      async function getBlocks() {
        for (let i = 0; i < 10; i++) {
          let block = await state.web3.eth.getBlock(state.blockNumber - i)
          setBlockList(blockList => [...blockList, block])
        }
      }
      getBlocks()
    }
  }, [state.blockNumber])

  useEffect(() => {
    if (blockList.length == 10) {
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
              console.log(result)
              setBlockList(prev => {
                let ret = prev.slice(0, 9)
                ret.unshift(result)
                return ret
              })
            })
          })
        return () => {
          subscription.unsubscribe(function(error, success) {
            if (success) console.log('Successfully unsubscribed!')
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
            const tabbedNavigation = below('medium')
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
                <Left>
                  {dataFetched && <Blocks blockList={blockList}></Blocks>}
                </Left>
                <Separator />

                <Right>
                  <Transactions
                    blockNumber={state.selectedBlock}
                  ></Transactions>
                </Right>
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

const Right = styled.div`
  width: 45vw;
`
const Separator = styled.div`
  width: 5vw;
`
const Table1Wrapper = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`

const StyledMain = styled(Main)`
  background: linear-gradient(130deg, rgb(0, 180, 230), rgb(0, 240, 224));
`
export default App
