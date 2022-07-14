export const agentAddresses = {
	eth: {
		main: {
			swap: {
				v2: '0xC2b299CF668974939B2CCca4eB99F0749F64a2e4',
				v3: undefined,
			},
		},
	},
	arbitrum: {
		one: {
			swap: {
				v2: undefined,
				v3: '0xDe77B9c28D49e14164E6fcf07Bb235FEB76d4a54',
			},
		},
		rinkeby: {
			swap: { v2: undefined, v3: '0xCb4a628D6ABd9Ac0aad0Bb6caC89Eb1EDfd33231' },
		},
	},
	polygon: {
		mainnet: {
			swap: {
				v2: '0xDe77B9c28D49e14164E6fcf07Bb235FEB76d4a54',
				v3: undefined,
			},
			weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
		},
		mumbai: {
			swap: {
				v2: undefined,
				v3: '0x35C7B647DDFE9b499E0130eC45820b727A262C58',
			},
			weth: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
		},
	},
} as const
