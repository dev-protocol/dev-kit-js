import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { metricsFactoryAbi } from '../metrics-factory/abi'
import { metricsAbi } from '../metrics/abi'
import { watchEvent } from '../utils/watchEvent'

export interface WaitForEventOptions {
	readonly metricsFactory: string
}

export type CreateAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => (
	propertyAddress: string,
	args: string[],
	options: WaitForEventOptions
) => Promise<string>

const getMetricsProperty = async (
	address: string,
	client: Web3
): Promise<string> =>
	execute({
		contract: new client.eth.Contract(metricsAbi, address),
		method: 'property',
	})

export const createAuthenticateCaller: CreateAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => async (
	propertyAddress: string,
	args: string[],
	{ metricsFactory }: WaitForEventOptions
): Promise<string> => {
	execute({
		contract,
		method: 'authenticate',
		mutation: true,
		client,
		args: [propertyAddress, ...args],
	}).catch((err) => err)

	return watchEvent({
		contract: new client.eth.Contract(metricsFactoryAbi, metricsFactory),
		resolver: async (resolve, e) => {
			const metricsAddress =
				e.event === 'Create' ? (e.returnValues._metrics as string) : undefined
			if (metricsAddress) {
				const property = await getMetricsProperty(metricsAddress, client)
				if (property === propertyAddress) {
					resolve()
				}
			}
		},
	}).then((res) => res.returnValues._metrics as string)
}
