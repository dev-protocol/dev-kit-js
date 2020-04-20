import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'

export type CreateVoteCaller = (
	contract: Contract,
	client: Web3
) => (tokenNumber: string) => Promise<void>

export const createVoteCaller: CreateVoteCaller = (
	contract: Contract,
	client: Web3
): ((tokenNumber: string) => Promise<void>) => async (tokenNumber: string) =>
	execute({
		contract,
		method: 'vote',
		mutation: true,
		client,
		args: [tokenNumber],
	})
