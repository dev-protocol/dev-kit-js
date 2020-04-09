import { Contract } from 'web3-eth-contract/types'

export type CreateMarketFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createMarketFactoryCaller: CreateMarketFactoryCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.marketFactory()
		.call()
		.then((result: string) => result)
