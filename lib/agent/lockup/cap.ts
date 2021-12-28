import { getLockupContract } from './common'
import { Options } from '../common/const'

type GetCap = (
	Options: Options
) => Promise<string | Error>

export const getCap: GetCap = async (
	options: Options
): Promise<string | Error> => {
    const lockupContract = await getLockupContract(options.provider)

	return lockupContract
	    ? await lockupContract.cap()
		: new Error('network is not valid')
}
