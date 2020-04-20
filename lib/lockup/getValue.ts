import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetValueCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetValueCaller: CreateGetValueCaller = (
	contract: Contract
) => async (propertyAddress: string, accountAddress: string) =>
	execute({
		contract,
		method: 'getValue',
		args: [propertyAddress, accountAddress],
	})
