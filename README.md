# dev-kit-js

[![CI Status](https://github.com/dev-protocol/dev-kit-js/workflows/Node/badge.svg)](https://github.com/dev-protocol/dev-kit-js/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Dev Kit for JavaScript

## How to use

### install

First, install this repository as an npm package.

```bash
> npm i -D @devprotocol/dev-kit
```

### import

You can use the Dev Protocol by importing it from a JavaScript(TypeScript) file.

```
import { contractFactory } from '@devprotocol/dev-kit'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const factory = contractFactory(provider)
cosnt balance ＝ await factory.dev().balanceOf('0xB204f0Bb68De735b98abBA5ccAE7459837c2f084')

```

This is an example of retrieving the balance of the DEV token held by 0xB204f0Bb68De735b98abBA5ccAE7459837c2f084

It covers all the contracts and their functions that can be executed with the Dev Protocol.

The URL of the provider is easy to use with each node provisioning service.

## how to develop

```bash
## install dependency
> yarn

## test
> yarn test

## test with coverage
> yarn test:coverage

## build
> yarn build
```
