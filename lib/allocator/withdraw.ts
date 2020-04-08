import { Contract } from 'web3-eth-contract/types'

export type CreateWithdrawCaller = (
	contract: Contract
) => (address: string) => Promise<void>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract
) => async (address: string) =>
	contract.methods
		.withdraw([address])
		.send()
		.then((result: void) => result)
