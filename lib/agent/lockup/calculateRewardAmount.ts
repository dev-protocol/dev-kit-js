import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'
import { Wallet } from 'ethers'

export type Options = {
	readonly wallet: Wallet
	readonly propertyAddress: string
}

type CalculateRewardAmount = (
	options: Options
) => Promise<readonly [string, string] | Error>

export const calculateRewardAmount: CalculateRewardAmount = async (
	options: Options
): Promise<readonly [string, string] | Error> => {
	const lockupContract = await getLockupContract(options.wallet)

	return lockupContract
		? await lockupContract.calculateRewardAmount(options.propertyAddress)
		: new Error('network is not valid')
}
