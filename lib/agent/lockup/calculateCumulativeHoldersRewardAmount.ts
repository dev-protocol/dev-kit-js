import { Provider } from '@ethersproject/abstract-provider'
import { getLockupContract } from './common'

type Options = {
	readonly provider: Provider
	readonly propertyAddress: string
}

export const calculateCumulativeHoldersRewardAmount = async (
	options: Options
): Promise<string | undefined> => {
	const lockupContract = await getLockupContract(options.provider)
	return lockupContract
		? lockupContract.calculateCumulativeHoldersRewardAmount(
				options.propertyAddress
		  )
		: undefined
}
