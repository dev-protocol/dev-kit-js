/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { swapClients } from './common/clients/swapClients'
import { TransactionResponse } from '@ethersproject/abstract-provider'

type PositionsCreateWithETH = (options: {
	readonly provider: Provider
	readonly ethAmount: string
	readonly destination: string
	readonly overrides: FallbackableOverrides
}) => Promise<{ readonly estimation: string, readonly create: () => Promise<TransactionResponse> }>

export const positionsCreateWithETH: PositionsCreateWithETH = async (options) => {
	const l2 = await swapClients(options.provider)

	return l2
		? {
			estimation: await l2.getEstimatedDevForEth(options.ethAmount),
			create: async () => {
				return await l2.swapEthAndStakeDevCaller(
					options.destination,
					options.overrides
				)
			}
		}
		: (undefined as never)
}
