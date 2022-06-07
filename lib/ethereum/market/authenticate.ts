/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable no-constant-condition */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Signer } from '@ethersproject/abstract-signer'
import type { BaseProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	QueryOption,
} from '../../common/utils/execute'
import { metricsAbi } from '../metrics/abi'
import { metricsFactoryAbi } from '../metrics-factory/abi'

export const getMetricsProperty = async (
	address: string,
	provider: BaseProvider
): Promise<string> =>
	execute<QueryOption>({
		contract: new ethers.Contract(address, metricsAbi, provider),
		mutation: false,
		method: 'property',
	})

export type WaitForEventOptions = {
	readonly metricsFactoryAddress: string
}

export type CreateAuthenticateCaller = (
	contract: ethers.Contract,
	provider: BaseProvider
) => (
	propertyAddress: string,
	args: readonly string[],
	options: WaitForEventOptions,
	overrides?: FallbackableOverrides
) => Promise<string>

export const createAuthenticateCaller: CreateAuthenticateCaller =
	(contract: ethers.Contract, provider: BaseProvider) =>
	async (
		propertyAddress: string,
		args: readonly string[],
		{ metricsFactoryAddress }: WaitForEventOptions,
		overrides?: FallbackableOverrides
	): Promise<string> => {
		await execute({
			contract,
			method: 'authenticate',
			mutation: true,
			args: [propertyAddress, ...args],
			padEnd: 6,
			overrides,
		})
		const metricsFactoryContract = new ethers.Contract(
			metricsFactoryAddress,
			metricsFactoryAbi,
			provider
		)

		return new Promise((resolve, reject) => {
			const subscriberdContract = metricsFactoryContract.on(
				'Create',
				async (_: string, metricsAddress: string) =>
					getMetricsProperty(metricsAddress, provider)
						.then((metricsProperty) => {
							if (metricsProperty === propertyAddress) {
								subscriberdContract.removeAllListeners()
								resolve(metricsAddress)
							}
						})
						.catch(reject)
			)
		})
	}
