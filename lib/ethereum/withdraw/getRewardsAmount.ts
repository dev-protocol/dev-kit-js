/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateGetRewardsAmountCaller = (
	contract: Contract
) => (address: string) => Promise<string>

export const createGetRewardsAmountCaller: CreateGetRewardsAmountCaller =
	(contract: Contract) => async (address: string) =>
		execute({ contract, method: 'getRewardsAmount', args: [address] })
