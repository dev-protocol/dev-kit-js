import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

type Options = {
	readonly provider: Provider
	readonly positionTokenId: string
}

export const calculateWithdrawableInterestAmountByPosition = async (
	options: Options
): Promise<string | undefined> => {
	const lockupContract = await getLockupContract(options.provider)
	return lockupContract
		? lockupContract.calculateWithdrawableInterestAmountByPosition(
				options.positionTokenId
		  )
		: undefined
}
