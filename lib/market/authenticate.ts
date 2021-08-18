/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable no-constant-condition */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { metricsAbi } from '../metrics/abi'
import { construct } from 'ramda'

const getMetricsProperty = async (
	address: string,
	provider: Provider | Signer
): Promise<string> =>
	execute<QueryOption>({
		contract: new ethers.Contract(address, metricsAbi, provider),
		mutation: false,
		method: 'property',
	})

export type WaitForEventOptions = {
	readonly maxWaitngLoopCount: number
}

export type CreateAuthenticateCaller = (
	contract: ethers.Contract,
	provider: Provider
) => (
	propertyAddress: string,
	args: readonly string[],
	options: WaitForEventOptions
) => Promise<string>

export const createAuthenticateCaller: CreateAuthenticateCaller =
	(contract: ethers.Contract, provider: Provider) =>
	async (
		propertyAddress: string,
		args: readonly string[],
		{ maxWaitngLoopCount }: WaitForEventOptions
	): Promise<string> => {
		await execute({
			contract,
			method: 'authenticate',
			mutation: true,
			args: [propertyAddress, ...args],
			padEnd: 6,
		})
		// const blockNumber = await provider.getBlockNumber()
		// // eslint-disable-next-line functional/no-let
		// let loopCount = 0
		// while (true) {
		// 	const events = await contract.queryFilter({}, blockNumber)
		// 	for (const event of events) {
		// 		if (event.event === 'Create') {
		// 			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// 			const metrics = (event.args as any)._metrics
		// 			const metricsProperty = await getMetricsProperty(metrics, provider)
		// 			if (metricsProperty === propertyAddress) {
		// 				return metrics
		// 			}
		// 		}
		// 	}
		// 	loopCount += 1
		// 	if (loopCount === maxWaitngLoopCount) {
		// 		throw new Error('Authentication failed')
		// 	}
		// }

		return new Promise((resolve, reject) => {
			contract.on('Create', async (_: string, metricsAddress: string) =>
				getMetricsProperty(metricsAddress, provider)
					.then(
						(metricsProperty) =>
							metricsProperty === propertyAddress && resolve(metricsAddress)
					)
					.catch(reject)
			)
		})
	}
