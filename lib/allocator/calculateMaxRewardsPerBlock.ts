import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateCalculateMaxRewardsPerBlockCaller = (
	contract: Contract
) => () => Promise<string>

export const createCalculateMaxRewardsPerBlockCaller: CreateCalculateMaxRewardsPerBlockCaller = (
	contract: Contract
	// eslint-disable-next-line functional/functional-parameters
) => async () =>
	execute({
		contract,
		method: 'calculateMaxRewardsPerBlock',
	})
