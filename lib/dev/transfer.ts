import { Contract } from 'web3-eth-contract/types'

export type CreateTransferCaller = (
	contract: Contract
) => (to: string, value: number) => Promise<boolean>

export const createTransferCaller: CreateTransferCaller = (
	contract: Contract
) => async (to: string, value: number) =>
	contract.methods
		.transfer([to, value])
		.call()
		.then((result: boolean) => result)
