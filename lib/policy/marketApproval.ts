/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateMarketApprovalCaller = (
	contract: Contract
) => (agree: string, opposite: string) => Promise<boolean>

export const createMarketApprovalCaller: CreateMarketApprovalCaller =
	(contract: Contract) =>
	async (agree: string, opposite: string): Promise<boolean> =>
		execute({
			contract,
			method: 'marketApproval',
			args: [agree, opposite],
		})
