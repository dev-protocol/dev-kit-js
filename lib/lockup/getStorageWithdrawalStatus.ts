/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetStorageWithdrawalStatusCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetStorageWithdrawalStatusCaller: CreateGetStorageWithdrawalStatusCaller =

		(contract: Contract) =>
		async (propertyAddress: string, accountAddress: string) =>
			execute({
				contract,
				method: 'getStorageWithdrawalStatus',
				args: [propertyAddress, accountAddress],
			})
