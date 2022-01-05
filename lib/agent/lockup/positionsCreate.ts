import { TransactionResponse } from '@ethersproject/abstract-provider'
import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../../common/utils/execute'


export type Options = {
	readonly provider: Provider,
	readonly propertyAddress: string
	readonly amount: string
	readonly overrides?: FallbackableOverrides
}

type PositionsCreate = (
	options: Options
) => Promise<TransactionResponse | undefined>

export const positionsCreate: PositionsCreate = async (
	options: Options
): Promise<TransactionResponse | undefined> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract
		? await lockupContract.depositToProperty(
				options.propertyAddress,
				options.amount
		  )
		: undefined
}
