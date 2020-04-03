import { Contract } from 'web3-eth-contract/types'

export type CreateWithdrawCaller = (
	contract: Contract
) => (propertyAddress: string) => Promise<true>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract
) => async propertyAddress =>
	contract.methods
		.withdraw(propertyAddress)
		.send()
		.then(() => true)
