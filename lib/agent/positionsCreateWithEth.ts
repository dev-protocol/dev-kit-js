/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import { clientsUtilsSwapForStake } from './common/clients/clientsUtilsSwapForStake'
import type { TransactionResponse } from 'ethers'
import { ContractRunner, ZeroHash } from 'ethers'

type PositionsCreateWithEth = (options: {
	readonly provider: ContractRunner
	readonly ethAmount?: string
	readonly devAmount?: string
	readonly destination: string
	readonly deadline?: number
	readonly gatewayAddress?: string
	readonly gatewayBasisPoints?: number
	readonly payload?: string | Uint8Array
	readonly overrides?: FallbackableOverrides
}) => Promise<{
	readonly estimatedDev: string
	readonly estimatedEth: string
	readonly create: () => Promise<TransactionResponse>
}>

export const positionsCreateWithEth: PositionsCreateWithEth = async (
	options,
) => {
	const [, l2] = await clientsUtilsSwapForStake(options.provider)

	return l2
		? {
				estimatedDev: options.ethAmount
					? await l2.getEstimatedDevForEth(options.ethAmount)
					: 'No ethAmount provided',
				estimatedEth: options.devAmount
					? await l2.getEstimatedEthForDev(options.devAmount)
					: 'No devAmount provided',
				create: async () => {
					const ethAmount = options.ethAmount
						? options.ethAmount
						: options.devAmount
						? await l2.getEstimatedEthForDev(options.devAmount)
						: 'Neither ethAmount nor devAmount provided'
					const _overrides = {
						overrides: {
							...{ value: ethAmount },
							...options.overrides?.overrides,
						},
					}

					const deadline =
						options.deadline ??
						((await options.provider.provider?.getBlock('latest'))?.timestamp ??
							Math.floor(new Date().getTime() / 1000)) + 300

					return options.gatewayAddress &&
						typeof options.gatewayBasisPoints === 'number'
						? await l2.swapEthAndStakeDevCaller(
								options.destination,
								deadline,
								options.payload ?? ZeroHash,
								_overrides,
								options.gatewayAddress,
								String(options.gatewayBasisPoints),
						  )
						: await l2.swapEthAndStakeDevCaller(
								options.destination,
								deadline,
								options.payload ?? ZeroHash,
								_overrides,
						  )
				},
		  }
		: (undefined as never)
}
