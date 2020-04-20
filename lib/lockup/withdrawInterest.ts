import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'
import { execute } from '../utils/execute'

export type CreateWithdrawInterestCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string) => Promise<true>

export const createWithdrawInterestCaller: CreateWithdrawInterestCaller = (
	contract: Contract,
	client: Web3
) => async (propertyAddress: string) =>
	execute({
		contract,
		method: 'withdrawInterest',
		mutation: true,
		client,
		args: [propertyAddress],
	}).then(() => true)
