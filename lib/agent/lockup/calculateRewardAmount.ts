import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

export type Options = {
	readonly provider: Provider
	readonly propertyAddress: string
}

type CalculateRewardAmount = (
	options: Options
) => Promise<readonly [string, string] | Error>

export const calculateRewardAmount: CalculateRewardAmount = async (
	options: Options
): Promise<readonly [string, string] | Error> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract
		? await lockupContract.calculateRewardAmount(options.propertyAddress)
		: new Error('network is not valid')
}
