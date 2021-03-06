import React from 'react'
import { Table, TableHeader, TableRow, useViewport, theme } from '@aragon/ui'
import BlockRow from './BlockRow'
import './styles.css'
import styled from 'styled-components'

const Blocks = React.memo(({ blockList }) => {
  const { contentBorder } = theme
  const { below } = useViewport()
  const compactMode = below('medium')
  return (
    <>
      <TitleContainer contentBorder={contentBorder}>
        <Title id={'BlocksTitle'}>{'Latest Blocks'}</Title>
      </TitleContainer>
      <Table
        compactMode={compactMode}
        header={
          !compactMode && (
            <TableRow>
              <TableHeader title="Number" css="width: 25%" />
              <TableHeader title="Transactions" css="width: 25%" />
              <TableHeader title="Time ago" css="width: 25%" />
              <TableHeader title="Miner" css="width: 25%" />
            </TableRow>
          )
        }
        css={`
          color: ${theme.textPrimary};
          margin-bottom: 20px;
        `}
      >
        {/* <TransitionGroup exit={false}> */}
        {blockList &&
          blockList.map((block, index) => (
            <BlockRow
              block={block}
              key={block.hash}
              smallViewMode={compactMode}
              rowId={`blockrow${index}`}
            />
          ))}
      </Table>
      <Footer contentBorder={contentBorder} />
    </>
  )
})
export default Blocks

export const Fade2 = styled(BlockRow)`
  transition: 5s;
  opacity: ${({ state }) => (state === true ? 1 : 0)};
`
const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 600;
  margin: ${p => (p.compactMode ? '20px 20px 10px 20px' : '30px 30px 5px 0')};
`
const TitleContainer = styled.div`
  border-bottom: 1px solid ${p => p.contentBorder};
  margin-bottom: 15px;
`
const Footer = styled.div`
  border-bottom: 1px solid ${p => p.contentBorder};
  height: 50px;
  margin-bottom: 5px;
`
