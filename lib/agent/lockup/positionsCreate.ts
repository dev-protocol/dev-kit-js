import { Provider } from '@ethersproject/abstract-provider'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../../common/utils/execute'
import { createDepositToPropertyCaller } from '../../ethereum/lockup/depositToProperty'
import { getLockupContract } from './common'

export type Options = {
	readonly provider: Provider
	readonly propertyAddress: string
	readonly amount: string
	readonly overrides?: FallbackableOverrides
}

export type PositionsCreate = (options: Options) => Promise<TransactionResponse>

export const positionsCreate: PositionsCreate = async (
	options: Options
): Promise<TransactionResponse> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const lockupContract = await getLockupContract(options.provider)

	const transactionResponse = await lockupContract.depositToProperty(
		options.propertyAddress,
		options.amount
	)
	return transactionResponse
}
