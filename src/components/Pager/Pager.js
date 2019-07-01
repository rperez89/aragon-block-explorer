import React, { useContext, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const Pager = React.memo(({ onNext }) => {
  return (
    <>
      <List>
        <Item>
          <Text>{'First'}</Text>
        </Item>
        <Item>
          <Text>{'<'}</Text>
        </Item>
        <Item>
          <Text>{'Page'}</Text>
        </Item>
        <Item>
          <Text onClick={onNext}>{'>'}</Text>
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
  background: rgb(220, 234, 239);
  color: rgb(112, 112, 112);
`
