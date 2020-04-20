import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetLastAssetValueEachMarketPerBlockCaller = (
	contract: Contract
) => (marketAddress: string) => Promise<string>

export const createGetLastAssetValueEachMarketPerBlockCaller: CreateGetLastAssetValueEachMarketPerBlockCaller = (
	contract: Contract
) => async (marketAddress: string) =>
	execute({
		contract,
		method: 'getLastAssetValueEachMarketPerBlock',
		args: [marketAddress],
	})
