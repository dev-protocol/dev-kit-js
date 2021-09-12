/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePositionsOfOwnerCaller = (
	contract: Contract
) => (accountAddress: string) => Promise<readonly number[]>

export const createPositionsOfOwnerCaller: CreatePositionsOfOwnerCaller =
	(contract: Contract) => async (accountAddress: string) => {
		const res = await execute<readonly string[]>({
			contract,
			method: 'positionsOfOwner',
			args: [accountAddress],
		})
		return res.map(Number)
	}
