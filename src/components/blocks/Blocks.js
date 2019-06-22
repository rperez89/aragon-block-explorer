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

const Blocks = React.memo(({ blockList }) => {
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
      <TransitionGroup className="todo-list" exit={false}>
        {blockList &&
          blockList.map((block, index) => (
            // const { number, timestamp } = block //destructuring
            <CSSTransition key={block.hash} timeout={300} classNames="item">
              <BlockRow block={block} key={block.hash} />
            </CSSTransition>
          ))}
      </TransitionGroup>{' '}
    </Table>
  )
})
export default Blocks
