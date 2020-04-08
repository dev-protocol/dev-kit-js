import { Contract } from 'web3-eth-contract/types'

export type CreateTransferCaller = (
	contract: Contract
) => (to: string, value: string) => Promise<boolean>

export const createTransferCaller: CreateTransferCaller = (
	contract: Contract
) => async (to: string, value: string) =>
	contract.methods
		.transfer([to, value])
		.send()
		.then((result: boolean) => result)
