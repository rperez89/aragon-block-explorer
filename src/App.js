import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from './context/StoreContext'
import styled from 'styled-components'
import { types } from './context/reducers'
import { Main, AppView, breakpoint, Viewport } from '@aragon/ui'
import './App.css'
import { useWeb3, unsubscribeWeb3 } from './utils/getWeb3'
import Blocks from './components/blocks/Blocks'

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
            console.log(blockHeader)
            setBlockList(prev => {
              let ret = prev.slice(0, 9)
              ret.unshift(blockHeader)
              return ret
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

  const removeLastOne = list => {
    console.log('INSIDE')
    console.log('lenght before: ' + list.length)
    if (list.length > 10) {
      let ret = list.reverse()
      ret.pop()
      console.log('lenght before: ' + ret.length)
      setBlockList(ret)
    }
  }

  console.log('length ', blockList)
  return (
    <Main>
      <AppView title="Block Explorer">
        <Viewport>
          {({ below }) => {
            const tabbedNavigation = below('medium')
            const compactTable = below('medium')
            return (
              <Container>
                <div>
                  {dataFetched && <Blocks blockList={blockList}></Blocks>}
                </div>

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

const Table1Wrapper = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`

const StyledMain = styled(Main)`
  background: linear-gradient(130deg, rgb(0, 180, 230), rgb(0, 240, 224));
`
export default App
