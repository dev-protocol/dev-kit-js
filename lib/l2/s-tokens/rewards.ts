/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { arrayify } from '../../common/utils/arrayify'
import { execute } from '../../common/utils/execute'

export type Rewards = {
	readonly entireReward: string
	readonly cumulativeReward: string
	readonly withdrawableReward: string
}

export type CreateRewardsCaller = (
	contract: Contract
) => (tokenId: number) => Promise<Rewards>

export const createRewardsCaller: CreateRewardsCaller =
	(contract: Contract) => async (tokenId: number) => {
		const res = await execute<{
			readonly entireReward_: string
			readonly cumulativeReward_: string
			readonly withdrawableReward_: string
		}>({
			contract,
			method: 'rewards',
			args: [String(tokenId)],
		})
		const arrayified = arrayify(res)
		return {
			entireReward: arrayified[0],
			cumulativeReward: arrayified[1],
			withdrawableReward: arrayified[2],
		}
	}
