# Aragon Block Explorer <img align="right" src="https://raw.githubusercontent.com/aragon/design/master/readme-logo.png" height="80px" /> [![CircleCI](https://circleci.com/gh/rperez89/aragon-block-explorer.svg?style=svg)](https://circleci.com/gh/rperez89/aragon-block-explorer) [![Percy](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Rodrigo/aragon-block-explorer)

## Overview

Aragon-Block-Explorer is a small app to explore the latest blocks on Ethereum. The goal of the app is to provide a way to glance at the recent Ether transfers happening on the blockchain.

<p align="center">
    <img src="https://raw.githubusercontent.com/rperez89/aragon-block-explorer/master/docs/resources/blockExp.png" />
</p>

## Getting Started

### Quick setup

```
npm install
```

This installs global package dependencies.

## How to run locally

```
npm run start:mainnet
```

Will explore the latest 10 blocks from Mainnet

```
npm run start:rinkeby
```

Will explore the latest 10 blocks from Rinkeby test network

## Running tests

The app was integrated with [puppeteer](https://github.com/GoogleChrome/puppeteer) and [percy](https://percy.io/) to review visual changes.

If you want to fork and set your own percy token you need to set the percy env variable

```
export PERCY_TOKEN=
```

```
npm run test:integration
```

If no Percy token was found the visual changes check will be sikped.
