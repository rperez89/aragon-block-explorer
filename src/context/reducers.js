const initialState = {
  web3: '',
  web3Subscription: '',
  blockNumber: '',
}

const types = {
  WEB3_INITIALIZED: 'WEB3_INITIALIZED',
  WEB3_SUBSCRIBED: 'WEB3_SUBSCRIBED',
  INIT_BLOCK_NUMBER: 'INIT_BLOCK_ARRAY',
}

const initBlocks = (blockNumber, web3) => {
  let ret = []
  for (let i = 0; i < 10; i++) {
    web3.eth.getBlock(blockNumber - i, false, (error, result) => {
      if (!error) ret.push(result)
    })
  }
  return ret
}

const reducer = (state = initialState, action) => {
  console.log({ oldState: state, type: action.type, payload: action.payload })
  switch (action.type) {
    case types.WEB3_INITIALIZED:
      return {
        ...state,
        web3: action.payload,
      }
    case types.WEB3_SUBSCRIBED:
      return {
        ...state,
        web3Subscription: action.payload,
      }
    case types.INIT_BLOCK_NUMBER:
      return {
        ...state,
        blockNumber: action.payload,
      }
    default:
      throw new Error('Unexpected action')
  }
}
export { initialState, types, reducer }
