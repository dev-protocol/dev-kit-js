/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { watchEvent } from '../../common/utils/watchEvent'
import { execute } from './execute'

const metricsFactoryAbi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_market',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_metrics',
				type: 'address',
			},
		],
		name: 'Create',
		type: 'event',
	},
] as readonly AbiItem[]
const metricsAbi = [
	{
		inputs: [],
		name: 'property',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as readonly AbiItem[]
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
): Promise<string> => {
	const fromBlock = await client.eth.getBlockNumber()
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line functional/no-expression-statement
		watchEvent({
			fromBlock,
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
}
