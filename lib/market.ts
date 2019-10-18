import { devClient, CustomOptions } from './client'

const marketABI = [
	{
		type: 'constructor',
		payable: false,
		stateMutability: 'nonpayable',
		inputs: [{ name: 'testInt', type: 'uint256' }]
	},
	{
		type: 'function',
		name: 'foo',
		constant: false,
		payable: false,
		stateMutability: 'nonpayable',
		inputs: [{ name: 'b', type: 'uint256' }, { name: 'c', type: 'bytes32' }],
		outputs: [{ name: '', type: 'address' }]
	},
	{
		type: 'event',
		name: 'Event',
		inputs: [
			{ indexed: true, name: 'b', type: 'uint256' },
			{ indexed: false, name: 'c', type: 'bytes32' }
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Event2',
		inputs: [
			{ indexed: true, name: 'b', type: 'uint256' },
			{ indexed: false, name: 'c', type: 'bytes32' }
		],
		anonymous: false
	}
]

const marketContract = (host: string, timeout?: number) => (
	address?: string,
	options?: CustomOptions
) =>
	new (devClient(host, timeout)).eth.Contract(marketABI, address, {
		...options
	})

export const schema = (host: string, timeout?: number) => (
	address?: string,
	options?: CustomOptions
) => async (): Promise<{ memory: string }> =>
	marketContract(host, timeout)(address, options)
		.methods.schema()
		.call()
