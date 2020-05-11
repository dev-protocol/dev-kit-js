import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { TxReceipt } from '../utils/web3-txs'

export type CreateVoteCaller = (
	contract: Contract,
	client: Web3
) => (tokenNumber: string) => Promise<TxReceipt>

export const createVoteCaller: CreateVoteCaller = (
	contract: Contract,
	client: Web3
): ((tokenNumber: string) => Promise<TxReceipt>) => async (
	tokenNumber: string
): Promise<TxReceipt> =>
	execute({
		contract,
		method: 'vote',
		mutation: true,
		client,
		args: [tokenNumber],
	})
