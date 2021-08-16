/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateHoldersShareCaller = (
	contract: Contract
) => (amount: string, lockups: string) => Promise<string>

export const createHoldersShareCaller: CreateHoldersShareCaller =
	(contract: Contract) =>
	async (amount: string, lockups: string): Promise<string> =>
		execute({
			contract,
			method: 'holdersShare',
			args: [amount, lockups],
		})
