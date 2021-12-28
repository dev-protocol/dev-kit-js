import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

type Options = {
	readonly provider: Provider
}

type GetCap = (Options: Options) => Promise<string | Error>

export const getCap: GetCap = async (
	options: Options
): Promise<string | Error> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract
		? await lockupContract.cap()
		: new Error('network is not valid')
}
