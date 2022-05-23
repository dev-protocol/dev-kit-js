/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { clientsUtilsSwapForStake } from './common/clients/clientsUtilsSwapForStake'
import { TransactionResponse } from '@ethersproject/abstract-provider'

type PositionsCreateWithEth = (options: {
	readonly provider: Provider
	readonly ethAmount?: string
	readonly devAmount?: string
	readonly destination: string
	readonly overrides?: FallbackableOverrides
}) => Promise<{ readonly estimatedDev: string, readonly estimatedEth: string, readonly create: () => Promise<TransactionResponse> }>

export const positionsCreateWithEth: PositionsCreateWithEth = async (options) => {
	const [, l2] = await clientsUtilsSwapForStake(options.provider)

	return l2
		? {
			estimatedDev: options.ethAmount ? await l2.getEstimatedDevForEth(options.ethAmount) : 'No ethAmount provided',
			estimatedEth: options.devAmount ? await l2.getEstimatedEthForDev(options.devAmount) : 'No devAmount provided',
			create: async () => {
				const ethAmount = options.ethAmount ? options.ethAmount :
					(options.devAmount ? await l2.getEstimatedEthForDev(options.devAmount) : 'Neither ethAmount nor devAmount provided')
				const _overrides = { ...options.overrides, ...{ overrides: { value: ethAmount } } }
				return await l2.swapEthAndStakeDevCaller(
					options.destination,
					_overrides
				)
			}
		}
		: (undefined as never)
}
