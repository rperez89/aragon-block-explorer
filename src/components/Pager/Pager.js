import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Pager = React.memo(({ onNext, onPrevious, totalPages, currentPage }) => {
  let [previousBlocked, setPreviousBlocked] = useState(false)
  let [nextBlocked, setNextBlocked] = useState(false)

  useEffect(() => {
    setNextBlocked(nxt => false)
    setPreviousBlocked(prv => false)
    if (currentPage === 1) {
      setPreviousBlocked(prev => true)
    }
    if (currentPage === totalPages) {
      setNextBlocked(nxt => true)
    }
  }, [currentPage, totalPages])

  return (
    <>
      <List>
        <Item>
          <Text>{'First'}</Text>
        </Item>
        <Item>
          <Previous
            onClick={currentPage > 1 ? onPrevious : undefined}
            disabled={previousBlocked}
          >
            {'<'}
          </Previous>
        </Item>
        <Item>
          <Pages>{`Page ${currentPage} of ${totalPages}`}</Pages>
        </Item>
        <Item>
          <Next
            onClick={currentPage < totalPages ? onNext : undefined}
            disabled={nextBlocked}
          >
            {'>'}
          </Next>
        </Item>
        <Item>
          <Text>{'Last'}</Text>
        </Item>
      </List>
    </>
  )
})
export default Pager

const List = styled.ul`
  float: right;
  height: 36px;
  margin-left: auto;
  margin-right: 0;
  margin-top: 5px;
  width: auto;
  text-align: right;
`
const Item = styled.li`
  display: inline-block;
  padding: 5px;
`
const Text = styled.a`
  float: left;
  padding: 0 14px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 9px;
  background: rgb(220, 234, 239);
  color: rgb(112, 112, 112);
  &:hover {
    background-color: ${({ disabled }) => !disabled && '#3498db'};
    color: ${({ disabled }) => !disabled && 'white'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`
const Next = styled.a`
  float: left;
  padding: 0 14px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 9px;
  background: rgb(220, 234, 239);
  color: rgb(112, 112, 112);
  &:hover {
    background-color: ${({ disabled }) => !disabled && '#3498db'};
    color: ${({ disabled }) => !disabled && 'white'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`
const Previous = styled.a`
  float: left;
  padding: 0 14px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 9px;
  background: rgb(220, 234, 239);
  color: rgb(112, 112, 112);
  &:hover {
    background-color: ${({ disabled }) => !disabled && '#3498db'};
    color: ${({ disabled }) => !disabled && 'white'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`
const Pages = styled.a`
  float: left;
  padding: 0 14px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-radius: 9px;
  background: rgb(220, 234, 239);
  color: rgb(112, 112, 112);
`
