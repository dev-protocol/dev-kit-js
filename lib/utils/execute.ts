/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from './getAccount'
import { TxReceipt } from './web3-txs'
import { txPromisify } from './txPromisify'

interface Options {
	contract: Contract
	method: string
	args?: Array<string | boolean>
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

export type ExecuteFunction = <
	T = string,
	O extends ExecuteOptions = CallOptions
>(
	opts: O
) => Promise<
	O extends CallOptions ? T : O extends SendOptions ? TxReceipt : never
>

type R<T, O extends ExecuteOptions> = O extends CallOptions
	? T
	: O extends SendOptions
	? TxReceipt
	: never

export const execute: ExecuteFunction = async <
	T = string,
	O extends ExecuteOptions = CallOptions
>({
	contract,
	method,
	args,
	mutation,
	client,
}: O): Promise<R<T, O>> =>
	(async (m): Promise<R<T, O>> =>
		(async (x): Promise<R<T, O>> =>
			mutation === true
				? txPromisify(x.send({ from: await getAccount(client as Web3) })).then(
						(receipt) => receipt
				  )
				: x.call())(args ? m(...args) : m()))(contract.methods[method])
