/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateCalculateWithdrawableInterestAmountCaller = (
	contract: Contract
) => (propertyAddress: string, account: string) => Promise<string>

export const createCalculateWithdrawableInterestAmountCaller: CreateCalculateWithdrawableInterestAmountCaller =
	(contract: Contract) => async (propertyAddress: string, account: string) =>
		execute({
			contract,
			method: 'calculateWithdrawableInterestAmount',
			args: [propertyAddress, account],
		})
