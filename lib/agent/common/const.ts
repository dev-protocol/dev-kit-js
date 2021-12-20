import { ethers } from 'ethers'

export const networks = {
	ethereum: {
		main: 1,
		ropsten: 3,
	},
	arbitrum: {
		one: 42161,
		rinkeby: 421611,
	},
}

// set alchemy, infura and so on.
// only for test, I will move them to somewhere
export const homestead = ethers.getDefaultProvider('homestead')
export const ropsten = ethers.getDefaultProvider('ropsten')
export const arbOne = ethers.getDefaultProvider(
	'https://arb-mainnet.g.alchemy.com/v2/rG0SkEsWLq0QPJKSxyZKpz047ThiR4GT'
)
export const arbRinkeby = ethers.getDefaultProvider(
	'https://arb-rinkeby.g.alchemy.com/v2/eELUbmXl4PRZxsGljpjzwS6hGqtAZ82w'
)
