import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { propertyAbi } from './abi'
import { createOwnerCaller } from './owner'
import { createTransferCaller } from './transfer'

export type PropertyContract = {
	readonly owner: () => Promise<string>
	readonly transfer: (to: string, value: string) => Promise<boolean>
}

export const createPropertyContract = (provider: Provider | Signer) => (
	address: string
): PropertyContract => {
	const contractClient = new ethers.Contract(
		address,
		[...propertyAbi],
		provider
	)

	return {
		owner: createOwnerCaller(contractClient),
		transfer: createTransferCaller(contractClient),
	}
}
