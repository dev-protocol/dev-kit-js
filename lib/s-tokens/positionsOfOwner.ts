/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePositionsOfOwnerCaller = (
	contract: Contract
) => (accountAddress: string) => Promise<readonly number[]>

export const createPositionsOfOwnerCaller: CreatePositionsOfOwnerCaller =
	(contract: Contract) => async (accountAddress: string) =>
		execute({
			contract,
			method: 'positionsOfOwner',
			args: [accountAddress],
		})
