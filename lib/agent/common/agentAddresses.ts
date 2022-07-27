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
				v2: '0xA379F35b916203112D157d4655353BB17AD81DC0',
				v3: undefined,
			},
			weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
		},
		mumbai: {
			swap: {
				v2: undefined,
				v3: '0x01C818717B5471562172f3F886E4C4dC053D6ed8',
			},
			weth: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
		},
	},
} as const
