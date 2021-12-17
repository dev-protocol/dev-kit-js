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
export const arbOne = ethers.getDefaultProvider()
export const arbRinkeby = ethers.getDefaultProvider()
