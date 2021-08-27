export const marketAbi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_config',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_behavior',
				type: 'address',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		constant: true,
		inputs: [],
		name: 'behavior',
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
		constant: true,
		inputs: [],
		name: 'enabled',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'issuedMetrics',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'votingEndBlockNumber',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [],
		name: 'toEnable',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: '_prop',
				type: 'address',
			},
			{
				internalType: 'string',
				name: '_args1',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args2',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args3',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args4',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args5',
				type: 'string',
			},
		],
		name: 'authenticate',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
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
				name: '_prop',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_author',
				type: 'address',
			},
			{
				internalType: 'string',
				name: '_args1',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args2',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args3',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args4',
				type: 'string',
			},
			{
				internalType: 'string',
				name: '_args5',
				type: 'string',
			},
		],
		name: 'authenticateFromPropertyFactory',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
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
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '_idHash',
				type: 'bytes32',
			},
		],
		name: 'authenticatedCallback',
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
		name: 'deauthenticate',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'schema',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
]
