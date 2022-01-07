import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

type Options = {
	readonly provider: Provider
}

export const getCap = async (options: Options): Promise<string | undefined> => {
	const lockupContract = await getLockupContract(options.provider)

	return lockupContract ? await lockupContract.cap() : undefined
}
