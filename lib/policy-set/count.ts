import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateCountCaller = (contract: Contract) => () => Promise<string>

export const createCountCaller: CreateCountCaller = (
	contract: Contract
	// eslint-disable-next-line functional/functional-parameters
) => async (): Promise<string> =>
	execute({
		contract,
		method: 'count',
	})
