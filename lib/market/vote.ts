import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateVoteCaller = (
	contract: Contract,
	client: Web3
) => (tokenNumber: string) => Promise<void>

export const createVoteCaller: CreateVoteCaller = (
	contract: Contract,
	client: Web3
): ((tokenNumber: string) => Promise<void>) => async (tokenNumber: string) =>
	contract.methods
		.vote(tokenNumber)
		.send({ from: await getAccount(client) })
		.then(() => {})
