import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { metricsFactoryAbi } from '../metrics-factory/abi'
import { metricsAbi } from '../metrics/abi'
import { watchEvent } from '../utils/watchEvent'

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

const getMetricsProperty = async (
	address: string,
	client: Web3
): Promise<string> =>
	execute({
		contract: new client.eth.Contract(metricsAbi as any, address),
		method: 'property',
	})

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
		}).catch((err) => reject(err))
		// eslint-disable-next-line functional/no-expression-statement
		watchEvent({
			contract: new client.eth.Contract(
				metricsFactoryAbi as any,
				metricsFactory
			),
			resolver: async (_resolve, e) =>
				((metricsAddress) =>
					metricsAddress
						? getMetricsProperty(metricsAddress, client).then((property) =>
								property === propertyAddress ? _resolve() : undefined
						  )
						: undefined)(
					e.event === 'Create' ? (e.returnValues._metrics as string) : undefined
				),
		})
			.then((res) => resolve(res.returnValues._metrics as string))
			.catch((err) => reject(err))
	})
