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
                  <Blocks></Blocks>
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
  background: linear-gradient(130deg, rgb(0, 180, 230), rgb(0, 240, 224));
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
