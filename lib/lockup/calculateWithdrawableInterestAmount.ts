import { Contract } from 'web3-eth-contract/types'

export type CreateCalculateWithdrawableInterestAmountCaller = (
	contract: Contract
) => (propertyAddress: string, account: string) => Promise<string>

export const createCalculateWithdrawableInterestAmountCaller: CreateCalculateWithdrawableInterestAmountCaller = (
	contract: Contract
) => async (propertyAddress: string, account: string) =>
	contract.methods
		.calculateWithdrawableInterestAmount(propertyAddress, account)
		.call()
		.then((result: string) => result)
