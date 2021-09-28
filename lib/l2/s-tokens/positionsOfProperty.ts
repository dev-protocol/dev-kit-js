/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreatePositionsOfPropertyCaller = (
	contract: Contract
) => (propertyAddress: string) => Promise<readonly number[]>

export const createPositionsOfPropertyCaller: CreatePositionsOfPropertyCaller =
	(contract: Contract) => async (propertyAddress: string) => {
		const res = await execute<readonly string[]>({
			contract,
			method: 'positionsOfProperty',
			args: [propertyAddress],
		})
		return res.map(Number)
	}
