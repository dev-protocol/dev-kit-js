import { ethers } from 'ethers'
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { propertyFactoryAbi } from './abi'
import { createCreatePropertyCaller } from './create'
import { WaitForEventOptions } from '../market/authenticate'
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'

export type PropertyFactoryContract = {
	readonly create: (
		name: string,
		symbol: string,
		author: string
	) => Promise<string>
	readonly createAndAuthenticate: (
		name: string,
		symbol: string,
		marketAddress: string,
		args: readonly string[],
		options: WaitForEventOptions
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
