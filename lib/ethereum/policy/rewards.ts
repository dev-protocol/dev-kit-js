/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateRewardsCaller = (
	contract: Contract
) => (lockups: string, assets: string) => Promise<string>

export const createRewardsCaller: CreateRewardsCaller =
	(contract: Contract) =>
	async (lockups: string, assets: string): Promise<string> =>
		execute({
			contract,
			method: 'rewards',
			args: [lockups, assets],
		})
