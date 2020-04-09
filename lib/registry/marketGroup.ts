import { Contract } from 'web3-eth-contract/types'

export type CreateMarketGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createMarketGroupCaller: CreateMarketGroupCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.marketGroup()
		.call()
		.then((result: string) => result)
