import { Contract } from 'web3-eth-contract/types'

export type CreateLockupCaller = (contract: Contract) => () => Promise<string>

export const createLockupCaller: CreateLockupCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.lockup()
		.call()
		.then((result: string) => result)
