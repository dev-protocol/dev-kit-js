import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

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

export const execute: ExecuteFunction = async <
	T = string,
	O extends ExecuteOption = QueryOption
>({
	contract,
	method,
	args,
	padEnd,
}: O) =>
	contract[method](
		args !== undefined && padEnd !== undefined
			? pad(args, padEnd)
			: args !== undefined
			? [...args]
			: undefined
	)

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
