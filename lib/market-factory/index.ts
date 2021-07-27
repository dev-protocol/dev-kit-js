/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { marketFactoryAbi } from './abi'
import { CustomOptions } from '../option'
import { createCreateCaller } from './create'
import { always } from 'ramda'

export type MarketFactoryContract = {
	readonly create: (marketBehaviorAddress: string) => Promise<boolean>
	readonly contract: () => Contract
}

export type CreateMarketFactoryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => MarketFactoryContract

export const createMarketFactoryContract: CreateMarketFactoryContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): MarketFactoryContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...marketFactoryAbi],
			address,
			{
				...options,
			}
		)

		return {
			create: createCreateCaller(contractClient, client),
			contract: always(contractClient),
		}
	}
