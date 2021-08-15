import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policySetAbi } from './abi'
import { createCountCaller } from './count'
import { createGetCaller } from './get'

export type PolicySetContract = {
	readonly count: () => Promise<string>
	readonly get: (index: string) => Promise<string>
}

export const createPolicySetContract = (provider: Provider | Signer) => (
	address: string
): PolicySetContract => {
	const contractClient = new ethers.Contract(
		address,
		[...policySetAbi],
		provider
	)

	return {
		count: createCountCaller(contractClient),
		get: createGetCaller(contractClient),
	}
}
