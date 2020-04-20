import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetWithdrawalStatusCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetWithdrawalStatusCaller: CreateGetWithdrawalStatusCaller = (
	contract: Contract
) => async (propertyAddress: string, accountAddress: string) =>
	execute({
		contract,
		method: 'getWithdrawalStatus',
		args: [propertyAddress, accountAddress],
	})
