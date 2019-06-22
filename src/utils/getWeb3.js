import Web3 from 'web3'
import provider from './providers'
import { useContext, useState, useEffect } from 'react'
import { types } from '../context/reducers'
import { StoreContext } from '../context/StoreContext'

const getProvider = () => {
  return provider[process.env.REACT_APP_ETH_NETWORK_TYPE]
}

export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          // Request account access if needed
          await window.ethereum.enable()
          // Acccounts now exposed
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3
        console.log('Injected web3 detected.')
        resolve(web3)
      } else {
        const web3 = new Web3(getProvider)
        console.log('No web3 instance injected, using Local web3.')
        resolve(web3)
      }
    })
  })

export function useWeb3() {
  const { state, dispatch, actions } = useContext(StoreContext)
  async function asyncWeb3() {
    try {
      const web3 = await getWeb3()
      dispatch({ type: types.WEB3_INITIALIZED, payload: web3 })

      web3.eth.getBlockNumber(function(error, result) {
        if (!error) dispatch({ type: types.INIT_BLOCK_NUMBER, payload: result })
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    asyncWeb3()
  }, [])
}

export function unsubscribeWeb3(subscription) {
  subscription.unsubscribe(function(error, success) {
    if (success) console.log('Successfully unsubscribed!')
  })
}
