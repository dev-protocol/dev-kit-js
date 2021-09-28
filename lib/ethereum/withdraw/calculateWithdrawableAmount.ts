/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateCalculateWithdrawableAmountCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createCalculateWithdrawableAmountCaller: CreateCalculateWithdrawableAmountCaller =

		(contract: Contract) =>
		async (propertyAddress: string, accountAddress: string) =>
			execute({
				contract,
				method: 'calculateWithdrawableAmount',
				args: [propertyAddress, accountAddress],
			})
