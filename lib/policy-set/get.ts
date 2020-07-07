import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetCaller = (
	contract: Contract
) => (index: string) => Promise<string>

export const createGetCaller: CreateGetCaller = (contract: Contract) => async (
	index: string
): Promise<string> =>
	execute({
		contract,
		method: 'get',
		args: [index],
	})
