import { Contract } from 'web3-eth-contract/types'

export type CreatePolicyFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createPolicyFactoryCaller: CreatePolicyFactoryCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.policyFactory()
		.call()
		.then((result: string) => result)
