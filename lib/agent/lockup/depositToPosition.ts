import { Provider } from '@ethersproject/abstract-provider'
import { getLockupContract } from './common'

type Options = {
	readonly provider: Provider
	readonly positionTokenId: string
	readonly amount: string
}

export const depositToPosition = async (
	options: Options
): Promise<boolean | undefined> => {
	const lockupContract = await getLockupContract(options.provider)
	return lockupContract
		? await lockupContract.depositToPosition(
				options.positionTokenId,
				options.amount
		  )
		: undefined
}
