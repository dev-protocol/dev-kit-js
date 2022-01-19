import { getLockupContract } from './common'
import { Provider } from '@ethersproject/abstract-provider'

type Options = {
	readonly provider: Provider
	readonly positionTokenId: string
	readonly amount: string
}

export const withdrawByPosition = async (
	options: Options
): Promise<boolean | undefined> => {
	const lockupContract = await getLockupContract(options.provider)
	return lockupContract
		? await lockupContract.withdrawByPosition(
				options.positionTokenId,
				options.amount
		  )
		: undefined
}
