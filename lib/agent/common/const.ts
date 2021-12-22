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

export const testProviders = {
    homestead: ethers.getDefaultProvider('homestead'),
	ropsten: ethers.getDefaultProvider('ropsten'),
	arbOne: ethers.getDefaultProvider(),
	arbRinkeby: ethers.getDefaultProvider(),
	polyMumbai: ethers.getDefaultProvider()
}
