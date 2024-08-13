export const withdrawAbi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'cumulativeWithdrawnReward',
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
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'lastWithdrawnRewardCapPrice',
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
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'lastWithdrawnRewardPrice',
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
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'pendingWithdrawal',
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
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'transferHistoryLength',
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
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'transferHistoryLengthOfRecipient',
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
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'transferHistoryLengthOfSender',
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
		name: 'transferHistoryOfRecipientByIndex',
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
		name: 'transferHistoryOfSenderByIndex',
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
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
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
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'calculateRewardAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_price',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_cap',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_allReward',
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
			{
				internalType: 'uint256',
				name: '_index',
				type: 'uint256',
			},
		],
		name: 'transferHistory',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'to',
						type: 'address',
					},
					{
						internalType: 'address',
						name: 'from',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'preBalanceOfRecipient',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'preBalanceOfSender',
						type: 'uint256',
					},
					{
						internalType: 'bool',
						name: 'filled',
						type: 'bool',
					},
					{
						internalType: 'uint256',
						name: 'blockNumber',
						type: 'uint256',
					},
				],
				internalType: 'struct ITransferHistory.TransferHistory',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
		constant: true,
	},
]
