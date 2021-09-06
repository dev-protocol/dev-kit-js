/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { arrayify } from '../utils/arrayify'
import { execute } from '../utils/execute'

export type Positions = {
	readonly property: string
	readonly amount: string
	readonly price: string
	readonly cumulativeReward: string
	readonly pendingReward: string
}

export type CreatePositionsCaller = (
	contract: Contract
) => (tokenId: number) => Promise<Positions>

export const createPositionsCaller: CreatePositionsCaller =
	(contract: Contract) => async (tokenId: number) => {
		const res = await execute<{
			readonly property_: string
			readonly amount_: string
			readonly price_: string
			readonly cumulativeReward_: string
			readonly pendingReward_: string
		}>({
			contract,
			method: 'positions',
			args: [String(tokenId)],
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
