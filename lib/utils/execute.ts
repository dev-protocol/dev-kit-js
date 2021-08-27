import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'

type Option = {
	readonly contract: ethers.Contract
	readonly method: string
	readonly args?: ReadonlyArray<string | boolean>
	readonly mutation?: boolean
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

export const execute: ExecuteFunction = async <
	T = string,
	O extends ExecuteOption = QueryOption
>({
	contract,
	method,
	args,
}: O) => contract[method](args ? [...args] : undefined)

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
