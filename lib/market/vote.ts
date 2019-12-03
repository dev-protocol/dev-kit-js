import { Contract } from 'web3-eth-contract/types'

export type CreateVoteCaller = (
	contract: Contract
) => (tokenNumber: string) => Promise<void>

export const createVoteCaller: CreateVoteCaller = (
	contract: Contract
): ((tokenNumber: string) => Promise<void>) => async (tokenNumber: string) =>
	contract.methods
		.vote([tokenNumber])
		.call()
		.then(() => {})
