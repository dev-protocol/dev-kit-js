import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateWithdrawCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string) => Promise<true>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract,
	client: Web3
) => async propertyAddress =>
	contract.methods
		.withdraw([propertyAddress])
		.send({ from: await getAccount(client) })
		.then(() => true)
