import { ethers } from 'ethers'
import { execute, MutationOption } from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type CreateBulkWithdrawCaller = (
	contract: ethers.Contract,
) => (propertyAddresses: readonly string[]) => Promise<TransactionResponse>

export const createBulkWithdrawCaller: CreateBulkWithdrawCaller =
	(contract: ethers.Contract) =>
	async (propertyAddresses): Promise<TransactionResponse> =>
		execute<MutationOption>({
			contract,
			method: 'bulkWithdraw',
			mutation: true,
			args: propertyAddresses,
		})
