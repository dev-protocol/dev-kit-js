import { Contract } from 'web3-eth-contract/types'

export type CreateGetLastAssetValueEachMarketPerBlockCaller = (
	contract: Contract
) => (marketAddress: string) => Promise<string>

export const createGetLastAssetValueEachMarketPerBlockCaller: CreateGetLastAssetValueEachMarketPerBlockCaller = (
	contract: Contract
) => async (marketAddress: string) =>
	contract.methods
		.getLastAssetValueEachMarketPerBlock(marketAddress)
		.call()
		.then((result: string) => result)
