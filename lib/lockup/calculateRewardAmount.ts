/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateCalculateRewardAmountCaller = (
	contract: Contract
) => (propertyAddress: string) => Promise<readonly string[]>

export const createCalculateRewardAmountCaller: CreateCalculateRewardAmountCaller = (
	contract: Contract
) => async (propertyAddress: string) =>
	execute({
		contract,
		method: 'calculateRewardAmount',
		args: [propertyAddress],
	})
