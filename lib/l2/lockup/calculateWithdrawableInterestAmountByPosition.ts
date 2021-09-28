/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreatecalculateWithdrawableInterestAmountByPositionCaller = (
	contract: Contract
) => (positionTokenId: string) => Promise<string>

export const createcalculateWithdrawableInterestAmountByPositionCaller: CreatecalculateWithdrawableInterestAmountByPositionCaller =
	(contract: Contract) => async (positionTokenId: string) =>
		execute({
			contract,
			method: 'calculateWithdrawableInterestAmountByPosition',
			args: [positionTokenId],
		})
