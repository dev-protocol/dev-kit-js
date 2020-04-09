import { Contract } from 'web3-eth-contract/types'

export type CreatePolicyCaller = (contract: Contract) => () => Promise<string>

export const createPolicyCaller: CreatePolicyCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.policy()
		.call()
		.then((result: string) => result)
