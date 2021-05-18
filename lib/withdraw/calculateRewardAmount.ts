/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract'
import { arrayify } from '../utils/arrayify'
import { execute } from '../utils/execute'

export type calculateRewardAmountCaller = (
	contract: Contract
) => (
	propertyAddress: string,
	accountAddress: string
) => Promise<readonly [string, string, string, string]>

export const calculateRewardAmountCaller: calculateRewardAmountCaller =
	(contract: Contract) =>
	async (propertyAddress: string, accountAddress: string) =>
		execute<Record<string, string>>({
			contract,
			method: 'calculateRewardAmount',
			args: [propertyAddress, accountAddress],
		}).then((r) => arrayify(r) as readonly [string, string, string, string])
