import { ethers } from 'ethers'
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { propertyFactoryAbi } from './abi'
import { createCreatePropertyCaller } from '../../ethereum/property-factory/create'
import { WaitForEventOptions } from '../../ethereum/market/authenticate'
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'
import { FallbackableOverrides } from '../../common/utils/execute'

export type PropertyFactoryContract = {
	readonly create: (
		name: string,
		symbol: string,
		author: string,
		overrides?: FallbackableOverrides
	) => Promise<string>
	readonly createAndAuthenticate: (
		name: string,
		symbol: string,
		marketAddress: string,
		args: readonly string[],
		options: WaitForEventOptions,
		overrides?: FallbackableOverrides
	) => Promise<{
		readonly property: string
		readonly transaction: TransactionResponse
		readonly waitForAuthentication: () => Promise<string>
	}>
}

export const createPropertyFactoryContract =
	(provider: Provider | Signer) =>
	(address: string): PropertyFactoryContract => {
		const contract = new ethers.Contract(
			address,
			[...propertyFactoryAbi],
			provider
		)

		return {
			create: createCreatePropertyCaller(contract),
			createAndAuthenticate: createCreateAndAuthenticateCaller(
				contract,
				provider as Provider
			),
		}
	}
