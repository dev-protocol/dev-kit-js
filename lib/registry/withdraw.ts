import { Contract } from 'web3-eth-contract/types'

export type CreateWithdrawCaller = (contract: Contract) => () => Promise<string>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.withdraw()
		.call()
		.then((result: string) => result)
