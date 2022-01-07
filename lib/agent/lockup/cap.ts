import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

export type Options = {
	readonly provider: Provider
}

type GetCap = (Options: Options) => Promise<string | undefined>

export const getCap: GetCap = async (
	options: Options
): Promise<string | undefined> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract ? await lockupContract.cap() : undefined
}
