import Web3 from 'web3'

export const stubbedWeb3 = ({
	eth: {
		async getAccounts(): Promise<string[]> {
			return Promise.resolve(['0x'])
		},
	},
} as unknown) as Web3
