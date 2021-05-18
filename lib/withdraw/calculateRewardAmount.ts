import { Contract } from 'web3-eth-contract'
import { execute } from '../utils/execute'

export type calculateRewardAmountCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const calculateRewardAmountCaller: calculateRewardAmountCaller = (
	contract: Contract
) => async (propertyAddress: string, accountAddress: string) =>
	execute({
		contract,
		method: 'calculateRewardAmount',
		args: [propertyAddress, accountAddress],
	})
