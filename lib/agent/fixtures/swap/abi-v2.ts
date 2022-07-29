export const swapAbiV2 = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_uniswapRouterAddress',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_devAddress',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_lockupAddress',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_sTokensAddress',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'payee',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Deposited',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'payee',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Withdrawn',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
		],
		name: 'claim',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'devAddress',
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
		inputs: [
			{
				internalType: 'address',
				name: 'user',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
		],
		name: 'gatewayFees',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'gatewayOf',
		outputs: [
			{
				internalType: 'uint256',
				name: 'input',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'fee',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'ethAmount',
				type: 'uint256',
			},
		],
		name: 'getEstimatedDevForEth',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'devAmount',
				type: 'uint256',
			},
		],
		name: 'getEstimatedEthForDev',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lockupAddress',
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
		name: 'sTokensAddress',
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
		inputs: [
			{
				internalType: 'address',
				name: 'property',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'bytes32',
				name: 'payload',
				type: 'bytes32',
			},
		],
		name: 'swapEthAndStakeDev',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'property',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
			{
				internalType: 'bytes32',
				name: 'payload',
				type: 'bytes32',
			},
			{
				internalType: 'address payable',
				name: 'gatewayAddress',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'gatewayFee',
				type: 'uint256',
			},
		],
		name: 'swapEthAndStakeDev',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'uniswapRouter',
		outputs: [
			{
				internalType: 'contract IUniswapV2Router02',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]
