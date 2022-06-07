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
