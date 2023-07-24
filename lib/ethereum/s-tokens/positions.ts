/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { arrayify } from '../../common/utils/arrayify'

export type Positions = {
	readonly property: string
	readonly amount: string
	readonly price: string
	readonly cumulativeReward: string
	readonly pendingReward: string
}

export type CreatePositionsCaller = (
	contract: ethers.Contract,
) => (tokenId: number) => Promise<Positions>

export const createPositionsCaller: CreatePositionsCaller =
	(contract: ethers.Contract) => async (tokenId: number) => {
		const res = await execute<
			QueryOption,
			{
				readonly property_: string
				readonly amount_: string
				readonly price_: string
				readonly cumulativeReward_: string
				readonly pendingReward_: string
			}
		>({
			contract,
			method: 'positions',
			args: [String(tokenId)],
			mutation: false,
		})
		const arrayified = arrayify(res)
		return {
			property: arrayified[0],
			amount: arrayified[1],
			price: arrayified[2],
			cumulativeReward: arrayified[3],
			pendingReward: arrayified[4],
		}
	}
