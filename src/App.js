import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from './context/StoreContext'
import styled, { css } from 'styled-components'
import { types } from './context/reducers'
import { Main, AppView, breakpoint, Viewport } from '@aragon/ui'
import './App.css'
import { useWeb3, unsubscribeWeb3 } from './utils/getWeb3'
import Blocks from './components/blocks/Blocks'
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
      setDataFetched(true)
    }
  }, [state.blockNumber])

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

  console.log('datafetched', dataFetched)
  return (
    <Main>
      <AppView title="Block Explorer">
        <Viewport>
          {({ below }) => {
            const tabbedNavigation = below('medium')
            const compactTable = below('medium')
            if (!dataFetched) {
              return (
                <SpinnerContainer>
                  <LoadingSpinner />
                </SpinnerContainer>
              )
            }
            return (
              <Container>
                <Left>
                  {dataFetched && <Blocks blockList={blockList}></Blocks>}
                </Left>
                <Separator />
                <div>#right content in there</div>
              </Container>
            )
          }}
        </Viewport>
      </AppView>
    </Main>
  )
}

const Container = styled.div`
  width: 100%;
  ${breakpoint(
    'medium',
    `
      display: flex;
    `
  )}
`
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
const Left = styled.div`
  width: 48%;
`
const Separator = styled.div`
  width: 2%;
`
const Table1Wrapper = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`

const StyledMain = styled(Main)`
  background: linear-gradient(130deg, rgb(0, 180, 230), rgb(0, 240, 224));
`
export default App
