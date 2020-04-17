import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateWithdrawInterestCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string) => Promise<true>

export const createWithdrawInterestCaller: CreateWithdrawInterestCaller = (
	contract: Contract,
	client: Web3
) => async (propertyAddress: string) =>
	contract.methods
		.withdrawInterest(propertyAddress)
		.send({ from: await getAccount(client) })
		.then(() => true)
