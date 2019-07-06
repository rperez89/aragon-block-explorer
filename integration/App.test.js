const WebpackDevServer = require('webpack-dev-server')
const puppeteer = require('puppeteer')
const dappeteer = require('dappeteer')
const { percySnapshot } = require('@percy/puppeteer')
const execa = require('execa')

jest.setTimeout(60000)

describe('Apps test ', () => {
  let browser
  let metamask
  let page
  let server

  beforeAll(async () => {
    browser = await dappeteer.launch(puppeteer, {
      headless: false,
      args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
    })
    metamask = await dappeteer.getMetamask(browser)
    metamask.switchNetwork('main')
    page = await browser.newPage()
    console.log('hello')
    await page.setViewport({ width: 1800, height: 768 })
    await page.goto('http://localhost:3000/')

    await metamask.approve()
    await page.bringToFront()
    await page.reload()
  })

  it('renders blocks section', async () => {
    const div = await page.waitForSelector('#BlocksContainer')
    const element = await page.waitForSelector('#BlocksTitle')
    const text = await page.evaluate(element => element.textContent, element)
    await percySnapshot(page, 'Blocks Section')
    expect(text).toBe('Latest Blocks')
  })

  it('renders transactions section', async () => {
    const tr = await page.waitForSelector('#blockrow3')
    const blockNumberSpan = await page.waitForSelector('#blockNumberblockrow3')
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
    await percySnapshot(page, 'Transaction Section')
    expect(transactionTitleText).toBe(
      'Transactions From Block: ' + blockNumberText
    )

    browser.close()
  })
  16000
})
