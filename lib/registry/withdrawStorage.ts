import { Contract } from 'web3-eth-contract/types'

export type CreateWithdrawStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createWithdrawStorageCaller: CreateWithdrawStorageCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.withdrawStorage()
		.call()
		.then((result: string) => result)
