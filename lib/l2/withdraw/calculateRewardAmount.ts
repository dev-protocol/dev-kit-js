import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { arrayify } from '../../common/utils'

export type HolderRewards = {
	readonly amount: string
	readonly price: string
	readonly cap: string
	readonly allReward: string
}

export type calculateRewardAmountCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string, accountAddress: string) => Promise<HolderRewards>

export const calculateRewardAmountCaller: calculateRewardAmountCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, accountAddress: string) => {
		const res = await execute<
			QueryOption,
			{
				readonly _amount: string
				readonly _price: string
				readonly _cap: string
				readonly _allReward: string
			}
		>({
			contract,
			method: 'calculateRewardAmount',
			args: [propertyAddress, accountAddress],
			mutation: false,
		})
		const [amount, price, cap, allReward] = arrayify(res)
		return { amount, price, cap, allReward }
	}
