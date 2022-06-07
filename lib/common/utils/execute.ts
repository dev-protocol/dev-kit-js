import { ethers, BigNumber, providers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { mergeAll } from 'ramda'

type Args = ReadonlyArray<string | boolean | readonly string[]>
type Overrides = {
	readonly gasLimit?: number
	readonly from?: string
	readonly value?: string
}
export type FallbackableOverrides = {
	readonly overrides?: Overrides
	readonly fallback?: Overrides
}
type Option = {
	readonly contract: ethers.Contract
	readonly method: string
	readonly args?: Args
	readonly mutation?: boolean
	readonly padEnd?: number
	readonly static?: boolean
}

export type QueryOption = Option & {
	readonly mutation: false
}

export type MutationOption = Option & {
	readonly mutation: true
	readonly overrides?: FallbackableOverrides
}

export type ExecuteOption = QueryOption | MutationOption

export type ExecuteFunction = <
	O extends ExecuteOption = QueryOption,
	R = string
>(
	opts: O
) => Promise<
	O extends QueryOption
		? R
		: O extends MutationOption
		? TransactionResponse
		: never
>
type PadCaller = (
	arr: Args,
	v: string | boolean | undefined | readonly string[],
	i: number,
	fn: PadCaller
) => Args
const pad = (args: Args, index: number): Args =>
	((fn: PadCaller): Args => fn([], args[0], 0, fn))(
		(
			arr: Args,
			v: string | boolean | undefined | readonly string[],
			i: number,
			fn: PadCaller
		): Args =>
			i < index ? fn(arr.concat(v ?? ''), args[i + 1], i + 1, fn) : arr
	)

type Value = boolean | string | number
type ValueWithBigNumber = Value | BigNumber
const isBigNumber = (data: unknown): data is BigNumber =>
	BigNumber.isBigNumber(data)
const toString = (data: Readonly<BigNumber>): string => data.toString()
const toStringObj = (
	data: Readonly<Record<string, ValueWithBigNumber>>
): Record<string, Value> => {
	const keys = Object.keys(data)
	const valueSet = keys.map((key) => ({
		[key]: ((value) => (isBigNumber(value) ? toString(value) : value))(
			data[key]
		),
	}))
	return mergeAll(valueSet)
}
const stringifyItem = (
	data: ValueWithBigNumber | Record<string, ValueWithBigNumber>
): Value | Readonly<Record<string, Value>> => {
	return isBigNumber(data)
		? toString(data)
		: typeof data === 'string' ||
		  typeof data === 'number' ||
		  typeof data === 'boolean'
		? data
		: toStringObj(data)
}
const stringify = (
	data:
		| ValueWithBigNumber
		| Record<string, ValueWithBigNumber>
		| readonly (ValueWithBigNumber | Record<string, ValueWithBigNumber>)[]
):
	| Value
	| Readonly<Record<string, Value>>
	| readonly (Value | Readonly<Record<string, Value>>)[] => {
	return data instanceof Array ? data.map(stringifyItem) : stringifyItem(data)
}

const N = null

type SignableProvider = providers.JsonRpcProvider | providers.Web3Provider

export const execute: ExecuteFunction = async <
	T = string,
	O extends ExecuteOption = QueryOption
>(
	opts: O
) => {
	const signer =
		typeof (opts.contract?.provider as SignableProvider)?.getSigner ===
		'function'
			? (opts.contract.provider as SignableProvider).getSigner()
			: undefined
	const contract =
		opts.mutation && signer ? opts.contract.connect(signer) : opts.contract
	const args =
		opts.args === undefined
			? undefined
			: opts.padEnd
			? [...pad(opts.args, opts.padEnd)]
			: [...opts.args]
	const argsOverrided =
		opts.mutation && opts.overrides?.overrides
			? [...(args || []), opts.overrides.overrides]
			: args
	const method = opts.static
		? contract.callStatic[opts.method]
		: contract[opts.method]
	const res = await (argsOverrided === undefined
		? method()
		: method.apply(N, argsOverrided)
	)
		// eslint-disable-next-line functional/functional-parameters
		.catch(() => {
			const retryArgs =
				opts.mutation && opts.overrides?.fallback
					? [...(args || []), opts.overrides.fallback]
					: args
			return retryArgs === undefined ? method() : method.apply(N, retryArgs)
		})
	const data = opts.mutation ? res : stringify(res)
	return data
}

// This is a sample code

// const sample = async (dwa: string) => {
// 	const res = await execute<MutationOption>({
// 		contract: {} as any,
// 		method: 'vote',
// 		args: ['dwadwa', true],
// 		mutation: true,
// 	})

// 	const receipt = await res.wait()

// 	const res2 = await execute<QueryOption>({
// 		contract: {} as any,
// 		method: 'vote',
// 		args: ['dwadwa', true],
// 		mutation: false,
// 	})
// }
