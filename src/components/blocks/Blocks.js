import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { types } from '../../context/reducers'
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  useViewport,
  theme,
} from '@aragon/ui'
import BlockRow from './BlockRow'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './styles.css'

const Blocks = () => {
  const { state, dispatch, actions } = useContext(StoreContext)
  let [blockList, setBlockList] = useState([])
  let subscription

  useEffect(() => {
    if (state.blockNumber) {
      console.log('BLOCKNUMBER ', state.blockNumber)
      let ret = []
      async function getBlocks() {
        for (let i = 0; i < 10; i++) {
          let block = await state.web3.eth.getBlock(state.blockNumber - i)
          setBlockList(prevBlockList => [...prevBlockList, block])
        }
      }
      getBlocks()
    }
  }, [state.blockNumber])

  console.log('BLOCKLIST2', blockList)
  // useEffect(() => {
  //   if (state.web3) {
  //     subscription = state.web3.eth.subscribe(
  //       'newBlockHeaders',
  //       (error, result) => {
  //         if (!error)
  //           setBlockList(blockList => addNewBlock(blockList, result.number))
  //       }
  //     )
  //     return () => {
  //       subscription.unsubscribe(function(error, success) {
  //         if (success) console.log('Successfully unsubscribed!')
  //       })
  //     }
  //   }
  // }, [state.web3])

  // const addNewBlock = (blockList, block) => {
  //   let ret = blockList.slice()
  //   state.web3.eth.getBlock(block, false, (error, result) => {
  //     if (!error) ret.unshift(result)
  //   })

  //   if (ret.length == 11) {
  //     ret.pop()
  //   }
  //   return ret
  // }

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>
  }

  return (
    <Table
      header={
        <TableRow>
          <TableHeader title="Date" css="width: 12%" />
          <TableHeader title="Source / Recipient" css="width: 40%" />
          <TableHeader title="Reference" css="width: 100%" />
          <TableHeader title="Amount" align="right" css="width: 0" />
          <TableHeader />
        </TableRow>
      }
      css={`
        color: ${theme.textPrimary};
        margin-bottom: 20px;
      `}
    >
      <TransitionGroup className="todo-list">
        {blockList &&
          blockList.map(block => (
            <CSSTransition key={block.hash} timeout={300} classNames="item">
              <BlockRow block={block} key={block.hash} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </Table>
  )
}
export default Blocks
