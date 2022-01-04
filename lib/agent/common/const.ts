import { ethers } from 'ethers'
import { env } from './env'

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

export const testProviders = {
	homestead: ethers.getDefaultProvider(env.homestead),
	ropsten: ethers.getDefaultProvider(env.ropsten),
	arbOne: ethers.getDefaultProvider(env.arbMainnet),
	arbRinkeby: ethers.getDefaultProvider(env.arbRinkeby),
	polyMumbai: ethers.getDefaultProvider(env.polygonMumbai),
}

