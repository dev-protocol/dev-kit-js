/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/functional-parameters */
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { execute, FallbackableOverrides } from '../../common/utils/execute'
import { ContractRunner, ethers } from 'ethers'
import { getMetricsProperty, WaitForEventOptions } from '../market/authenticate'
import { metricsFactoryAbi } from '../metrics-factory/abi'

export type CreateCreateAndAuthenticateCaller = (
	contract: ethers.Contract,
	provider: ContractRunner,
) => (
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

export const createCreateAndAuthenticateCaller: CreateCreateAndAuthenticateCaller =

		(contract: ethers.Contract, provider: ContractRunner) =>
		async (
			name: string,
			symbol: string,
			marketAddress: string,
			args: readonly string[],
			{ metricsFactoryAddress }: WaitForEventOptions,
			overrides?: FallbackableOverrides,
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
				overrides,
			})

			const metricsFactoryContract = new ethers.Contract(
				metricsFactoryAddress,
				metricsFactoryAbi,
				provider,
			)

			const waitForAuthentication = (): Promise<string> =>
				new Promise((resolve, reject) => {
					const subscriberdContract = metricsFactoryContract.on(
						'Create',
						async (_: string, metricsAddress: string) =>
							getMetricsProperty(metricsAddress, provider)
								.then(async (metricsProperty) => {
									if (metricsProperty === marketAddress) {
										;(await subscriberdContract).removeAllListeners()
										resolve(metricsAddress)
									}
								})
								.catch(reject),
					)
				})

			return new Promise((resolve) => {
				const subscribedContract = contract.on(
					'Create',
					async (_: string, propertyAddress: string) => {
						;(await subscribedContract).removeAllListeners()
						resolve({
							property: propertyAddress,
							transaction,
							waitForAuthentication,
						})
					},
				)
			})
		}
