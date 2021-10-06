import { ethers, BigNumber } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { mergeAll } from 'ramda'

type Args = ReadonlyArray<string | boolean | readonly string[]>
type Option = {
	readonly contract: ethers.Contract
	readonly method: string
	readonly args?: Args
	readonly mutation?: boolean
	readonly padEnd?: number
}

export type QueryOption = Option & {
	readonly mutation: false
}

export type MutationOption = Option & {
	readonly mutation: true
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
const stringify = (
	data:
		| ValueWithBigNumber
		| readonly ValueWithBigNumber[]
		| Record<string, ValueWithBigNumber>
): Value | readonly Value[] | Record<string, Value> => {
	return isBigNumber(data)
		? toString(data)
		: typeof data === 'string' ||
		  typeof data === 'number' ||
		  typeof data === 'boolean'
		? data
		: data instanceof Array
		? data.map((d) => (isBigNumber(d) ? toString(d) : d))
		: ((datax: Readonly<Record<string, ValueWithBigNumber>>) => {
				const keys = Object.keys(datax)
				const valueSet = keys.map((key) => ({
					[key]: ((value) => (isBigNumber(value) ? toString(value) : value))(
						datax[key]
					),
				}))
				return mergeAll(valueSet)
		  })(data)
}

const N = null

export const execute: ExecuteFunction = async <
	T = string,
	O extends ExecuteOption = QueryOption
>({
	contract,
	method,
	args,
	padEnd,
	mutation,
}: O) => {
	const res = await (args === undefined
		? contract[method]()
		: contract[method].apply(
				N,
				padEnd !== undefined ? [...pad(args, padEnd)] : [...args]
		  ))
	const data = mutation ? res : stringify(res)
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
