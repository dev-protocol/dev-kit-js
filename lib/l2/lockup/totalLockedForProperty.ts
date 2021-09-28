/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateTotalLockedForPropertyCaller = (
	contract: Contract
) => (address: string) => Promise<string>

export const createTotalLockedForPropertyCaller: CreateTotalLockedForPropertyCaller =
	(contract: Contract) => async (address: string) =>
		execute({ contract, method: 'totalLockedForProperty', args: [address] })
