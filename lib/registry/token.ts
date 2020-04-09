import { Contract } from 'web3-eth-contract/types'

export type CreateTokenCaller = (contract: Contract) => () => Promise<string>

export const createTokenCaller: CreateTokenCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.token()
		.call()
		.then((result: string) => result)
