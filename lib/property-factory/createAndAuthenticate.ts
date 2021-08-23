/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/functional-parameters */
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { execute } from '../utils/execute'
import { ethers } from 'ethers'
import { WaitForEventOptions } from '../market/authenticate'

export type CreateCreateAndAuthenticateCaller = (contract: ethers.Contract) => (
	name: string,
	symbol: string,
	marketAddress: string,
	args: readonly string[],
	options: WaitForEventOptions
) => Promise<{
	readonly property: string
	readonly transaction: TransactionResponse
	// readonly waitForAuthentication: () => Promise<string>
}>

export const createCreateAndAuthenticateCaller: CreateCreateAndAuthenticateCaller =

		(contract: ethers.Contract) =>
		async (
			name: string,
			symbol: string,
			marketAddress: string,
			args: readonly string[]
			// { metricsFactoryAddress }: WaitForEventOptions
		): Promise<{
			readonly property: string
			readonly transaction: TransactionResponse
			// readonly waitForAuthentication: () => Promise<string>
		}> => {
			const transaction = await execute({
				contract,
				method: 'createAndAuthenticate',
				args: [name, symbol, marketAddress, ...args],
				mutation: true,
				padEnd: 6,
			})

			return new Promise((resolve) => {
				contract.on('Create', async (_: string, propertyAddress: string) => {
					resolve({
						property: propertyAddress,
						transaction,
					})
				})
			})
		}
