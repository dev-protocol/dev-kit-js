import { ethers } from 'ethers'

import { Rewards } from '../s-tokens/rewards'
import { execute, QueryOption } from '../../common/utils/execute'
import { Positions as StakingPosition } from '../s-tokens/positions'

type QueryMethods = 'image' | 'name' | 'description'

export type CreateQueryCaller = (
	contract: ethers.Contract,
	method: QueryMethods
) => (
	id: number,
	address: string,
	stakingPositions: StakingPosition,
	rewards: Rewards,
	keys: readonly string[]
) => Promise<string>

export const createQueryCaller: CreateQueryCaller =
	(contract: ethers.Contract, method: QueryMethods) =>
	async (
		id: number,
		address: string,
		stakingPositions: StakingPosition,
		rewards: Rewards,
		keys: readonly string[]
	) =>
		execute<QueryOption, string>({
			contract,
			method: method,
			args: [String(id), address, stakingPositions, rewards, keys],
			mutation: false,
		})
