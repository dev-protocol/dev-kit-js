import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { policySetAbi } from './abi'
import { CustomOptions } from '../option'
import { createCountCaller } from './count'
import { createGetCaller } from './get'

export type PolicySetContract = {
	readonly count: () => Promise<string>
	readonly get: (index: string) => Promise<string>
}

export type CreatePolicySetContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PolicySetContract

export const createPolicySetContract: CreatePolicySetContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => {
	const contractClient: Contract = new client.eth.Contract(
		[...policySetAbi],
		address,
		{
			...options,
		}
	)

	return {
		count: createCountCaller(contractClient),
		get: createGetCaller(contractClient),
	}
}
