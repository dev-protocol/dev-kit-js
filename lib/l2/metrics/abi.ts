import { AbiItem } from 'web3-utils'

export const metricsAbi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_market',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'market',
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
