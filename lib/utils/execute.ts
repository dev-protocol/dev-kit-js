/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from './getAccount'
import { TxReceipt } from './web3-txs'
import { txPromisify } from './txPromisify'

type Args = ReadonlyArray<string | boolean>
type Options = {
	readonly contract: Contract
	readonly method: string
	readonly args?: Args
	readonly mutation?: boolean
	readonly client?: Web3
	readonly padEnd?: number
}

export type SendOptions = Options & {
	readonly mutation: true
	readonly client: Web3
}

export type CallOptions = Options & {
	readonly mutation?: false
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

type PadCaller = (
	arr: Args,
	v: string | boolean | undefined,
	i: number,
	fn: PadCaller
) => Args
const pad = (args: Args, index: number): Args =>
	((fn: PadCaller): Args => fn([], args[0], 0, fn))(
		(
			arr: Args,
			v: string | boolean | undefined,
			i: number,
			fn: PadCaller
		): Args =>
			i < index ? fn(arr.concat(v ?? ''), args[i + 1], i + 1, fn) : arr
	)

export const execute: ExecuteFunction = async <
	T = string,
	O extends ExecuteOptions = CallOptions
>({
	contract,
	method,
	args,
	mutation,
	client,
	padEnd,
}: O): Promise<R<T, O>> => {
	const m = contract.methods[method]
	const a =
		args !== undefined && padEnd !== undefined ? pad(args, padEnd) : args
	const x = a ? m(...a) : m()
	return mutation === true
		? txPromisify(x.send({ from: await getAccount(client as Web3) })).then(
				(receipt) => receipt
		  )
		: x.call()
}
