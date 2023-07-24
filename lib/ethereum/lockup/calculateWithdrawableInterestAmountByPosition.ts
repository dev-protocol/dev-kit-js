/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreatecalculateWithdrawableInterestAmountByPositionCaller = (
	contract: ethers.Contract,
) => (positionTokenId: string) => Promise<string>

export const createcalculateWithdrawableInterestAmountByPositionCaller: CreatecalculateWithdrawableInterestAmountByPositionCaller =
	(contract: ethers.Contract) => async (positionTokenId: string) =>
		execute<QueryOption>({
			contract,
			method: 'calculateWithdrawableInterestAmountByPosition',
			args: [positionTokenId],
			mutation: false,
		})
