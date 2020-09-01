import Web3 from 'web3'
import { metricsFactoryAbi } from '../metrics-factory/abi'
import { metricsAbi } from '../metrics/abi'
import { watchEvent } from '../utils/watchEvent'
import { execute } from './execute'

const getMetricsProperty = async (
	address: string,
	client: Web3
): Promise<string> =>
	execute({
		contract: new client.eth.Contract([...metricsAbi], address),
		method: 'property',
	})

export const waitForCreateMetrics = async (
	client: Web3,
	propertyAddress: string,
	metricsFactoryAddress: string
): Promise<string> =>
	new Promise((resolve, reject) => {
		// eslint-disable-next-line functional/no-expression-statement
		watchEvent({
			contract: new client.eth.Contract(
				[...metricsFactoryAbi],
				metricsFactoryAddress
			),
			resolver: async (e) =>
				((metricsAddress) =>
					metricsAddress
						? getMetricsProperty(metricsAddress, client)
								.then((property) =>
									property === propertyAddress ? true : false
								)
								.catch(reject)
						: false)(
					e.event === 'Create' ? (e.returnValues._metrics as string) : undefined
				),
		})
			.then((res) => resolve(res.returnValues._metrics as string))
			.catch(reject)
	})
