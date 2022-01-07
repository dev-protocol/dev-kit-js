import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

type Options = {
	readonly provider: Provider
	readonly propertyAddress: string
}

export const calculateRewardAmount = async (
	options: Options
): Promise<readonly [string, string] | undefined> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract
		? await lockupContract.calculateRewardAmount(options.propertyAddress)
		: undefined
}
