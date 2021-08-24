/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/functional-parameters */
import { Provider } from '@ethersproject/abstract-provider'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { execute } from '../utils/execute'
import { ethers } from 'ethers'
import { getMetricsProperty, WaitForEventOptions } from '../market/authenticate'
import { metricsFactoryAbi } from '../metrics-factory/abi'

export type CreateCreateAndAuthenticateCaller = (
	contract: ethers.Contract,
	provider: Provider
) => (
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

export const createCreateAndAuthenticateCaller: CreateCreateAndAuthenticateCaller =

		(contract: ethers.Contract, provider: Provider) =>
		async (
			name: string,
			symbol: string,
			marketAddress: string,
			args: readonly string[],
			{ metricsFactoryAddress }: WaitForEventOptions
		): Promise<{
			readonly property: string
			readonly transaction: TransactionResponse
			readonly waitForAuthentication: () => Promise<string>
		}> => {
			const transaction = await execute({
				contract,
				method: 'createAndAuthenticate',
				args: [name, symbol, marketAddress, ...args],
				mutation: true,
				padEnd: 6,
			})

			const metricsFactoryContract = new ethers.Contract(
				metricsFactoryAddress,
				metricsFactoryAbi,
				provider
			)

			const waitForAuthentication = (): Promise<string> =>
				new Promise((resolve, reject) => {
					const subscriberdContract = metricsFactoryContract.on(
						'Create',
						async (_: string, metricsAddress: string) =>
							getMetricsProperty(metricsAddress, provider)
								.then((metricsProperty) => {
									if (metricsProperty === marketAddress) {
										subscriberdContract.removeAllListeners()
										resolve(metricsAddress)
									}
								})
								.catch(reject)
					)
				})

			return new Promise((resolve) => {
				const subscribedContract = contract.on(
					'Create',
					async (_: string, propertyAddress: string) => {
						subscribedContract.removeAllListeners()
						resolve({
							property: propertyAddress,
							transaction,
							waitForAuthentication,
						})
					}
				)
			})
		}
