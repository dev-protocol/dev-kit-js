/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { arrayify } from '../../common/utils/arrayify'

export type Rewards = {
	readonly entireReward: string
	readonly cumulativeReward: string
	readonly withdrawableReward: string
}

export type CreateRewardsCaller = (
	contract: ethers.Contract
) => (tokenId: number) => Promise<Rewards>

export const createRewardsCaller: CreateRewardsCaller =
	(contract: ethers.Contract) => async (tokenId: number) => {
		const res = await execute<
			QueryOption,
			{
				readonly entireReward_: string
				readonly cumulativeReward_: string
				readonly withdrawableReward_: string
			}
		>({
			contract,
			method: 'rewards',
			args: [String(tokenId)],
			mutation: false,
		})
		const arrayified = arrayify(res)
		return {
			entireReward: arrayified[0],
			cumulativeReward: arrayified[1],
			withdrawableReward: arrayified[2],
		}
	}
