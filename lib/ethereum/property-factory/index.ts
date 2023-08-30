import { ContractRunner, ethers } from 'ethers'
import type { TransactionResponse } from 'ethers'
import { propertyFactoryAbi } from './abi'
import { createCreatePropertyCaller } from './create'
import { WaitForEventOptions } from '../market/authenticate'
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'
import { FallbackableOverrides } from '../../common/utils/execute'

export type PropertyFactoryContract = {
	readonly create: (
		name: string,
		symbol: string,
		author: string,
		overrides?: FallbackableOverrides,
	) => Promise<string>
	readonly createAndAuthenticate: (
		name: string,
		symbol: string,
		marketAddress: string,
		args: readonly string[],
		options: WaitForEventOptions,
		overrides?: FallbackableOverrides,
	) => Promise<{
		readonly property: string
		readonly transaction: TransactionResponse
		readonly waitForAuthentication: () => Promise<string>
	}>
	readonly contract: () => ethers.Contract
}

export const createPropertyFactoryContract =
	(provider: ContractRunner) =>
	(address: string): PropertyFactoryContract => {
		const contract = new ethers.Contract(
			address,
			[...propertyFactoryAbi],
			provider,
		)

		return {
			create: createCreatePropertyCaller(contract),
			createAndAuthenticate: createCreateAndAuthenticateCaller(
				contract,
				provider,
			),
			contract: () => contract,
		}
	}
