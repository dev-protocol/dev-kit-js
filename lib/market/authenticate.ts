/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { waitForCreateMetrics } from '../utils/waitForCreateMetrics'

export type WaitForEventOptions = {
	readonly metricsFactory: string
}

export type CreateAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => (
	propertyAddress: string,
	args: readonly string[],
	options: WaitForEventOptions
) => Promise<string>

export const createAuthenticateCaller: CreateAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => async (
	propertyAddress: string,
	args: readonly string[],
	{ metricsFactory }: WaitForEventOptions
): Promise<string> =>
	new Promise((resolve, reject) => {
		// eslint-disable-next-line functional/no-expression-statement
		execute({
			contract,
			method: 'authenticate',
			mutation: true,
			client,
			args: [propertyAddress, ...args],
			padEnd: 6,
		}).catch(reject)

		// eslint-disable-next-line functional/no-expression-statement
		waitForCreateMetrics(client, propertyAddress, metricsFactory)
			.then(resolve)
			.catch(reject)
	})
