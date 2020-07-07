import { AbiItem } from 'web3-utils'

export const lockupAbi = [
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
				name: '_from',
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
				name: '_value',
				type: 'uint256',
			},
		],
		name: 'Lockedup',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		constant: true,
		inputs: [],
		name: 'basis',
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
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'changeOwner',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
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
		constant: false,
		inputs: [],
		name: 'createStorage',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'getStorageAddress',
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
		name: 'getStorageAllValue',
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
		name: 'getStorageCumulativeGlobalRewards',
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
				internalType: 'address',
				name: '_addr',
				type: 'address',
			},
		],
		name: 'getStorageCumulativeLockedUpUnitAndBlock',
		outputs: [
			{
				internalType: 'uint256',
				name: '_unit',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_block',
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
				internalType: 'address',
				name: '_addr',
				type: 'address',
			},
		],
		name: 'getStorageCumulativeLockedUpValue',
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
		name: 'getStorageDIP4GenesisBlock',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'getStorageInterestPrice',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'getStorageLastBlockNumber',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'getStorageLastCumulativeGlobalReward',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'getStorageLastInterestPrice',
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
		name: 'getStorageLastSameRewardsAmountAndBlock',
		outputs: [
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_block',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'getStoragePendingInterestWithdrawal',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'getStoragePropertyValue',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_sender',
				type: 'address',
			},
		],
		name: 'getStorageValue',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_from',
				type: 'address',
			},
		],
		name: 'getStorageWithdrawalStatus',
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
		name: 'isOwner',
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
		name: 'owner',
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
		inputs: [],
		name: 'renounceOwnership',
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
				name: '_storageAddress',
				type: 'address',
			},
		],
		name: 'setStorage',
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
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
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
				name: '_from',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
		],
		name: 'lockup',
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
		],
		name: 'cancel',
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
		],
		name: 'withdraw',
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
		name: 'getCumulativeLockedUp',
		outputs: [
			{
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_unit',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_block',
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
		name: 'getCumulativeLockedUpAll',
		outputs: [
			{
				internalType: 'uint256',
				name: '_value',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_unit',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_block',
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
		name: 'update',
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
			{
				internalType: 'uint256',
				name: '_lastReward',
				type: 'uint256',
			},
		],
		name: 'difference',
		outputs: [
			{
				internalType: 'uint256',
				name: '_reward',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_holdersAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_holdersPrice',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_interestAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_interestPrice',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'next',
		outputs: [
			{
				internalType: 'uint256',
				name: '_holders',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_interest',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_holdersPrice',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_interestPrice',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'calculateWithdrawableInterestAmount',
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
		inputs: [
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'withdrawInterest',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'getAllValue',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_sender',
				type: 'address',
			},
		],
		name: 'getValue',
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
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'getPropertyValue',
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
		inputs: [
			{
				internalType: 'uint256',
				name: '_block',
				type: 'uint256',
			},
		],
		name: 'setDIP4GenesisBlock',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as readonly AbiItem[]
