export const agentAddresses = {
	eth: {
		main: {
			swap: {
				v2: '0x6400264F991de614048838a7d4B536733BCE3069',
				v3: undefined,
			},
		},
	},
	arbitrum: {
		one: {
			swap: {
				v2: undefined,
				v3: '0x60Ca7E3960e5F143DdB42B19B64F65c27cAD561d',
			},
		},
		rinkeby: {
			swap: { v2: undefined, v3: '0x4cd6B431B7A242D51B4D96aE5839a8b8f060F7A9' },
		},
	},
	polygon: {
		mainnet: {
			swap: {
				v2: undefined,
				v3: '0x9265Cf9e6Dc5B163bDB75d51661Ca8EA3b6150c4',
			},
			swapUsdc: '0x0000000',
			weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
		},
		mumbai: {
			swap: {
				v2: undefined,
				v3: '0x60650E5a95864b989C8b7B0357a2d4979a34c6AF',
			},
			swapUsdc: '0x0000000',
			weth: '0x3c8d6A6420C922c88577352983aFFdf7b0F977cA',
		},
	},
} as const
