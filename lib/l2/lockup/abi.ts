export const lockupAbi = [
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
				indexed: true,
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
			{
				indexed: false,
				internalType: 'uint256',
				name: '_tokenId',
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
				indexed: false,
				internalType: 'uint256',
				name: '_cap',
				type: 'uint256',
			},
		],
		name: 'UpdateCap',
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
				indexed: true,
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
			{
				indexed: false,
				internalType: 'uint256',
				name: '_reward',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
		],
		name: 'Withdrew',
		type: 'event',
	},
	{
		inputs: [],
		name: 'cap',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'cumulativeGlobalReward',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'cumulativeHoldersRewardCap',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'initialCumulativeHoldersRewardCap',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'lastCumulativeHoldersPriceCap',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'lastCumulativeHoldersRewardAmountPerProperty',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'lastCumulativeHoldersRewardPrice',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'lastCumulativeHoldersRewardPricePerProperty',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'lastCumulativeRewardPrice',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'lastLockedChangedCumulativeReward',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'lastSameGlobalRewardAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'lastSameGlobalRewardTimestamp',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'registryAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'totalLocked',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'totalLockedForProperty',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_registry',
				type: 'address',
			},
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
		],
		name: 'depositToProperty',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
			{
				internalType: 'bytes32',
				name: '_payload',
				type: 'bytes32',
			},
		],
		name: 'depositToProperty',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
		],
		name: 'depositToPosition',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
		],
		name: 'withdrawByPosition',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getLockedupProperties',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'property',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'value',
						type: 'uint256',
					},
				],
				internalType: 'struct ILockup.LockedupProperty[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_cap',
				type: 'uint256',
			},
		],
		name: 'updateCap',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'calculateCumulativeRewardPrices',
		outputs: [
			{
				internalType: 'uint256',
				name: '_reward',
				type: 'uint256',
			},
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
				name: '_holdersCap',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_property',
				type: 'address',
			},
		],
		name: 'calculateRewardAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
	{
		inputs: [],
		name: 'update',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256',
			},
		],
		name: 'calculateWithdrawableInterestAmountByPosition',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
]
