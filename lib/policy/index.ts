import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { policyAbi } from './abi'
import { CustomOptions } from '../option'
import { createHoldersShareCaller } from './holdersShare'
import { always } from 'ramda'

export type PolicyContract = {
	readonly holdersShare: (amount: string, lockups: string) => Promise<string>
	readonly contract: () => Contract
}

export type CreatePolicyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PolicyContract

export const createPolicyContract: CreatePolicyContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
) => {
	const contractClient: Contract = new client.eth.Contract(
		[...policyAbi],
		address,
		{
			...options,
		}
	)

	return {
		holdersShare: createHoldersShareCaller(contractClient),
		contract: always(contractClient),
	}
}
