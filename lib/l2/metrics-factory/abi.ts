export const metricsFactoryAbi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_config',
				type: 'address',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_from',
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
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_from',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_metrics',
				type: 'address',
			},
		],
		name: 'Destroy',
		type: 'event',
	},
	{
		constant: true,
		inputs: [],
		name: 'configAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'create',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: '_metrics',
				type: 'address',
			},
		],
		name: 'destroy',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
]
