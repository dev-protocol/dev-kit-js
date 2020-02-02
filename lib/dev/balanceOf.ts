import { Contract } from 'web3-eth-contract/types'

export type CreateBalanceOfCaller = (
	contract: Contract
) => (address: string) => Promise<string>

export const createBalanceOfCaller: CreateBalanceOfCaller = (
	contract: Contract
) => async (address: string) =>
	contract.methods
		.balanceOf(address)
		.call()
		.then((result: string) => result)
