/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { policyFactoryAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { always } from 'ramda'
import { createCreateCaller } from './create'
import { createForceAttachCaller } from './forceAttach'

export type PolicyFactoryContract = {
	readonly create: (newPolicyAddress: string) => Promise<boolean>
	readonly forceAttach: (policy: string) => Promise<boolean>
	readonly contract: () => Contract
}

export type CreatePolicyFactoryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PolicyFactoryContract

export const createPolicyFactoryContract: CreatePolicyFactoryContract =
	(client: Web3) => (address?: string, options?: CustomOptions) => {
		const contractClient: Contract = new client.eth.Contract(
			[...policyFactoryAbi],
			address,
			{
				...options,
			}
		)

		return {
			create: createCreateCaller(contractClient, client),
			forceAttach: createForceAttachCaller(contractClient, client),
			contract: always(contractClient),
		}
	}
