import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { exportAllDeclaration } from '@babel/types'
const puppeteer = require('puppeteer')

const dappeteer = require('dappeteer')

jest.setTimeout(60000)

describe('Apps test ', () => {
  let browser
  let metamask
  let page
  beforeAll(async () => {
    browser = await dappeteer.launch(puppeteer, {
      headless: false,
      args: ['--start-maximized'],
    })
    metamask = await dappeteer.getMetamask(browser)
    page = await browser.newPage()
    await page.setViewport({ width: 1800, height: 768 })
    await page.goto('http://localhost:3000/')
  })

  it('renders blocks section', async () => {
    const div = await page.waitForSelector('#BlocksContainer')
    const element = await page.waitForSelector('#BlocksTitle')
    const text = await page.evaluate(element => element.textContent, element)

    expect(text).toBe('Latest Blocks')
  }),
    it('renders blocks section', async () => {
      const tr = await page.waitForSelector('#blockrow3')
      const blockNumberSpan = await page.waitForSelector(
        '#blockNumberblockrow3'
      )
      await page.click('#blockrow3')
      const blockNumberText = await page.evaluate(
        blockNumberSpan => blockNumberSpan.textContent,
        blockNumberSpan
      )
      const transactionTitle = await page.waitForSelector('#TransactionTitle')
      const transactionTitleText = await page.evaluate(
        transactionTitle => transactionTitle.textContent,
        transactionTitle
      )

      expect(transactionTitleText).toBe(
        'Transactions From Block: ' + blockNumberText
      )

      browser.close()
    })
  16000
})
