import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { swapClients } from './common/clients/swapClients'
import { TransactionResponse } from '@ethersproject/abstract-provider'

type PositionsCreateWithETH = (options: {
	readonly provider: Provider
	readonly propertyAddress: string
	readonly overrides: FallbackableOverrides
}) => Promise<TransactionResponse>

export const positionsCreateWithETH: PositionsCreateWithETH = async (options) => {
	const l2 = await swapClients(options.provider)

	return l2
		? l2.swapEthAndStakeDevCaller(
			options.propertyAddress,
			options.overrides
		)
		: (undefined as never)
}
