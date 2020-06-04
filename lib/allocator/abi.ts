import { AbiItem } from 'web3-utils'

export const allocatorAbi = [
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
				indexed: false,
				internalType: 'address',
				name: '_metrics',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_market',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_lockupValue',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_result',
				type: 'uint256',
			},
		],
		name: 'AllocationResult',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint256',
				name: '_blocks',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_mint',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_marketValue',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_assets',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_totalAssets',
				type: 'uint256',
			},
		],
		name: 'BeforeAllocation',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'Paused',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'PauserAdded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'PauserRemoved',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'Unpaused',
		type: 'event',
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'addPauser',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'basis',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64',
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
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'isPauser',
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
		constant: false,
		inputs: [],
		name: 'pause',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'paused',
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
		constant: false,
		inputs: [],
		name: 'renouncePauser',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [],
		name: 'unpause',
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
				name: '_metrics',
				type: 'address',
			},
		],
		name: 'allocate',
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
				name: '_metrics',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
		],
		name: 'calculatedCallback',
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
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_to',
				type: 'address',
			},
		],
		name: 'beforeBalanceChange',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'getRewardsAmount',
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
		inputs: [
			{
				internalType: 'uint256',
				name: '_blocks',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_mint',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_marketValue',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_assets',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_totalAssets',
				type: 'uint256',
			},
		],
		name: 'allocation',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'pure',
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{
				internalType: 'address',
				name: '_metrics',
				type: 'address',
			},
		],
		name: 'allocatable',
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
] as readonly AbiItem[]
