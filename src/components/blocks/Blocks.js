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
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group'
import './styles.css'
import styled from 'styled-components'

const Blocks = React.memo(({ blockList }) => {
  return (
    <div>
      <Table
        header={
          <TableRow>
            <TableHeader title="Number" css="width: 25%" />
            <TableHeader title="Transactions" css="width: 25%" />
            <TableHeader title="Time ago" css="width: 25%" />
            <TableHeader title="Miner" css="width: 25%" />
          </TableRow>
        }
        css={`
          color: ${theme.textPrimary};
          margin-bottom: 20px;
        `}
      >
        {/* <TransitionGroup exit={false}> */}
        {blockList &&
          blockList.map((block, index) => (
            // const { number, timestamp } = block //destructuring
            // <CSSTransition key={block.hash} timeout={300} classNames="item">

            <BlockRow block={block} key={block.hash} />

            // </CSSTransition>
          ))}
        {/* </TransitionGroup> */}
      </Table>
    </div>
  )
})
export default Blocks

export const Fade2 = styled(BlockRow)`
  transition: 5s;
  opacity: ${({ state }) => (state === true ? 1 : 0)};
`
