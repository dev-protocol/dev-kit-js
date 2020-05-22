import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateWithdrawInterestCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string) => Promise<boolean>

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
	}).then(T)
