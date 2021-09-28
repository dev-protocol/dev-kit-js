/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { addressRegistryAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createPolicyCaller } from './policy'
import { always } from 'ramda'

export type RegistryContract = {
	readonly policy: () => Promise<string>
	readonly contract: () => Contract
}

export type CreateRegistryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => RegistryContract

export const createRegistryContract: CreateRegistryContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): RegistryContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...addressRegistryAbi],
			address,
			{
				...options,
			}
		)

		return {
			policy: createPolicyCaller(contractClient),
			contract: always(contractClient),
		}
	}
