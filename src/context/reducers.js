import getWeb3 from '../utils/getWeb3'

const initialState = {
  web3: '',
}

const types = {
  WEB3_INITIALIZED: 'WEB3_INITIALIZED',
}

const reducer = (state = initialState, action) => {
  console.log({ oldState: state, type: action.type, payload: action.payload })
  switch (action.type) {
    case types.WEB3_INITIALIZED:
      return {
        ...state,
        web3: action.payload,
      }
    default:
      throw new Error('Unexpected action')
  }
}
export { initialState, types, reducer }
