/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { arrayify } from '../utils/arrayify'
import { execute } from '../utils/execute'

export type CreateCalculateRewardAmountCaller = (
	contract: Contract
) => (propertyAddress: string) => Promise<readonly [string, string]>

export const createCalculateRewardAmountCaller: CreateCalculateRewardAmountCaller =
	(contract: Contract) => async (propertyAddress: string) =>
		execute<Record<string, string>>({
			contract,
			method: 'calculateRewardAmount',
			args: [propertyAddress],
		}).then((r) => arrayify(r) as readonly [string, string])
