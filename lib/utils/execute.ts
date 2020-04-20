/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from './getAccount'

interface Options {
	contract: Contract
	method: string
	args?: string[]
	mutation?: boolean
	client?: Web3
}

export interface SendOptions extends Options {
	mutation: true
	client: Web3
}

export interface CallOptions extends Options {
	mutation?: false
}

export type ExecuteOptions = CallOptions | SendOptions

export type ExecuteFunction = <T>(opts: ExecuteOptions) => Promise<T>

export const execute: ExecuteFunction = async <T>({
	contract,
	method,
	args,
	mutation,
	client,
}: ExecuteOptions): Promise<T> =>
	(async (m): Promise<T> =>
		(async (x): Promise<T> =>
			mutation === true
				? x.send({ from: await getAccount(client as Web3) })
				: x.call())(args ? m(...args) : m()))(contract.methods[method])
