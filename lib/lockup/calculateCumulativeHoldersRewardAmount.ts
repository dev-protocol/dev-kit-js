import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateCalculateCumulativeHoldersRewardAmountCaller = (
	contract: Contract
) => (propertyAddress: string) => Promise<string>

export const createCalculateCumulativeHoldersRewardAmountCaller: CreateCalculateCumulativeHoldersRewardAmountCaller = (
	contract: Contract
) => async (propertyAddress: string) =>
	execute({
		contract,
		method: 'calculateCumulativeHoldersRewardAmount',
		args: [propertyAddress],
	})
