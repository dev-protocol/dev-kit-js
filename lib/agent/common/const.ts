import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../../common/utils/execute'

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

export type Options = {
	readonly provider: Provider
	readonly propertyAddress: string
	readonly amount: string
	readonly overrides?: FallbackableOverrides
}

// set alchemy, infura and so on.
// only for test, I will move them to somewhere

export const testProviders = {
	homestead: ethers.getDefaultProvider('homestead'),
	ropsten: ethers.getDefaultProvider('ropsten'),
	arbOne: ethers.getDefaultProvider(),
	arbRinkeby: ethers.getDefaultProvider(),
	polyMumbai: ethers.getDefaultProvider(),
}
