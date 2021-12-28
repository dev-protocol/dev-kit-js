import { TransactionResponse } from '@ethersproject/abstract-provider'
import { getLockupContract } from './common'
import { Options } from '../common/const'

type PositionsCreate = (
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
