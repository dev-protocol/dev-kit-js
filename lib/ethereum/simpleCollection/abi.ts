export const simpleCollectionsAbi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint8',
				name: 'version',
				type: 'uint8',
			},
		],
		name: 'Initialized',
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
		inputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'property',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'pendingReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.StakingPositions',
				name: '_positions',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'uint256',
						name: 'entireReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'withdrawableReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.Rewards',
				name: '',
				type: 'tuple',
			},
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
		],
		name: 'description',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'property',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'pendingReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.StakingPositions',
				name: '_positions',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'uint256',
						name: 'entireReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'withdrawableReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.Rewards',
				name: '',
				type: 'tuple',
			},
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
		],
		name: 'image',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_contract',
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
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'property',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'pendingReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.StakingPositions',
				name: '_positions',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'uint256',
						name: 'entireReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'withdrawableReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.Rewards',
				name: '',
				type: 'tuple',
			},
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
		],
		name: 'name',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'id',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'address',
						name: 'property',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'cumulativeReward',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'pendingReward',
						type: 'uint256',
					},
				],
				internalType: 'struct ISTokensManagerStruct.StakingPositions',
				name: '_positions',
				type: 'tuple',
			},
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
		],
		name: 'onBeforeMint',
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
		name: 'owner',
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
				name: '',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		name: 'propertyImages',
		outputs: [
			{
				internalType: 'string',
				name: 'src',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
			{
				internalType: 'string',
				name: 'description',
				type: 'string',
			},
			{
				internalType: 'uint256',
				name: 'requiredETHAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'requiredETHFee',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'gateway',
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
				name: '_propertyAddress',
				type: 'address',
			},
			{
				internalType: 'bytes32',
				name: '_key',
				type: 'bytes32',
			},
		],
		name: 'removeImage',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_propertyAddress',
				type: 'address',
			},
			{
				components: [
					{
						internalType: 'string',
						name: 'src',
						type: 'string',
					},
					{
						internalType: 'string',
						name: 'name',
						type: 'string',
					},
					{
						internalType: 'string',
						name: 'description',
						type: 'string',
					},
					{
						internalType: 'uint256',
						name: 'requiredETHAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'requiredETHFee',
						type: 'uint256',
					},
					{
						internalType: 'address',
						name: 'gateway',
						type: 'address',
					},
				],
				internalType: 'struct SimpleCollections.Image[]',
				name: '_images',
				type: 'tuple[]',
			},
			{
				internalType: 'bytes32[]',
				name: '_keys',
				type: 'bytes32[]',
			},
		],
		name: 'setImages',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_contract',
				type: 'address',
			},
		],
		name: 'setSwapAndStake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'stakedAmountAtMinted',
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
		inputs: [],
		name: 'swapAndStake',
		outputs: [
			{
				internalType: 'contract ISwapAndStake',
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
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
]
