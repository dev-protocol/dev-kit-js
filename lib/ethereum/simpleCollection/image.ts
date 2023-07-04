import { ethers } from 'ethers'

import { Rewards } from '../s-tokens/rewards'
import { execute, QueryOption } from '../../common/utils/execute'
import { Positions as StakingPosition } from '../s-tokens/positions'

export type CreateImageCaller = (
	contract: ethers.Contract
) => (
	id: number,
	address: string,
	stakingPositions: StakingPosition,
	rewards: Rewards,
	keys: readonly string[]
) => Promise<string>

export const createImageCaller: CreateImageCaller =
	(contract: ethers.Contract) =>
	async (
		id: number,
		address: string,
		stakingPositions: StakingPosition,
		rewards: Rewards,
		keys: readonly string[]
	) =>
		execute<QueryOption, string>({
			contract,
			method: 'image',
			args: [String(id), address, stakingPositions, rewards, keys],
			mutation: false,
		})
