/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import { clientsUtilsSwapForStake } from './common/clients/clientsUtilsSwapForStake'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'

type PositionsCreateWithEth = (options: {
	readonly provider: BaseProvider
	readonly ethAmount?: string
	readonly devAmount?: string
	readonly destination: string
	readonly overrides?: FallbackableOverrides
	readonly payload?: string
	readonly deadline?: number
	readonly gatewayAddress?: string
	readonly gatewayBasisPoints?: number
}) => Promise<{
	readonly estimatedDev: string
	readonly estimatedEth: string
	readonly create: () => Promise<TransactionResponse>
}>

export const positionsCreateWithEth: PositionsCreateWithEth = async (
	options
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
							...options.overrides?.overrides,
						},
					}

					const deadline = options.deadline
						? options.deadline
						: (await options.provider.getBlock('latest')).timestamp + 300

					return options.gatewayAddress && options.gatewayBasisPoints
						? await l2.swapEthAndStakeDevPolygonCaller(
								options.destination,
								ethAmount,
								deadline,
								options.payload ?? ethers.constants.HashZero,
								_overrides,
								options.gatewayAddress,
								String(options.gatewayBasisPoints)
						  )
						: await l2.swapEthAndStakeDevPolygonCaller(
								options.destination,
								ethAmount,
								deadline,
								options.payload ?? ethers.constants.HashZero,
								_overrides
						  )
				},
		  }
		: (undefined as never)
}
