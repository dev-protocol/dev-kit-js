import { Provider } from '@ethersproject/abstract-provider'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../../common/utils/execute'
import { getLockupContract } from './common'

export type Options = {
	readonly provider: Provider
	readonly propertyAddress: string
	readonly amount: string
	readonly overrides?: FallbackableOverrides
}

export type PositionsCreate = (
	options: Options
) => Promise<TransactionResponse | Error>

export const positionsCreate: PositionsCreate = async (
	options: Options
): Promise<TransactionResponse | Error> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract
		? await lockupContract.depositToProperty(
				options.propertyAddress,
				options.amount
		  )
		: new Error('network is not valid')
}
