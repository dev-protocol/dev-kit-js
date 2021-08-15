import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policyAbi } from './abi'
import { createHoldersShareCaller } from './holdersShare'

export type PolicyContract = {
	readonly holdersShare: (amount: string, lockups: string) => Promise<string>
}

export const createPolicyContract = (provider: Provider | Signer) => (
	address: string
): PolicyContract => {
	const contractClient = new ethers.Contract(address, [...policyAbi], provider)
	return {
		holdersShare: createHoldersShareCaller(contractClient),
	}
}
