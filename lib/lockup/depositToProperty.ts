/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateDepositToPropertyCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string, amount: string) => Promise<boolean>

export const createDepositToPropertyCaller: CreateDepositToPropertyCaller =
	(contract: Contract, client: Web3) =>
	async (propertyAddress: string, amount: string) =>
		execute({
			contract,
			method: 'depositToProperty',
			mutation: true,
			client,
			args: [propertyAddress, amount],
		}).then(T)
