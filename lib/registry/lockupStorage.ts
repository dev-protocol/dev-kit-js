import { Contract } from 'web3-eth-contract/types'

export type CreateLockupStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createLockupStorageCaller: CreateLockupStorageCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.lockupStorage()
		.call()
		.then((result: string) => result)
