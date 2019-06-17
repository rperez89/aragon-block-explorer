import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from './context/StoreContext'
import { types } from './context/reducers'
import { Main } from '@aragon/ui'
import './App.css'
import getWeb3 from './utils/getWeb3'
import useInterval from './utils/useInterval'

function App() {
  const { state, dispatch, actions } = useContext(StoreContext)
  console.log('state', state)

  useEffect(() => {
    async function Web3() {
      const web3 = await getWeb3()
      dispatch({ type: types.WEB3_INITIALIZED, payload: web3 })
    }
    Web3()
  }, [])

  useInterval(() => {
    console.log('hello')
  }, 1000)

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>
  }
  return (
    <Main>
      <div className="App"></div>
    </Main>
  )
}
export default App
