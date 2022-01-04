import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'
import { Wallet } from 'ethers'
type Options = {
	readonly wallet: Wallet
}

type GetCap = (Options: Options) => Promise<string | Error>

export const getCap: GetCap = async (
	options: Options
): Promise<string | Error> => {
	const lockupContract = await getLockupContract(options.wallet)

	return lockupContract
		? await lockupContract.cap()
		: new Error('network is not valid')
}
