/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import { clientsUtilsSwapUsdcForStake } from './common/clients/clientsUtilsSwapUsdcForStake'
import { ZeroHash, type ContractRunner } from 'ethers'
import {
	approveIfNeeded,
	ApproveIfNeededResult,
} from './common/approveIfNeeded'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'

type PositionsCreateWithUsdc = (options: {
	readonly provider: ContractRunner
	readonly usdcAmount?: string
	readonly devAmountOut?: string
	readonly devAmount?: string
	readonly destination: string
	readonly from?: string
	readonly overrides?: FallbackableOverrides
	readonly payload?: string
	readonly deadline?: number
	readonly gatewayAddress?: string
	readonly gatewayBasisPoints?: number
}) => Promise<{
	readonly estimatedDev: string
	readonly estimatedUsdc: string
	readonly create: () => Promise<UndefinedOr<ApproveIfNeededResult>>
}>

export const positionsCreateWithUsdc: PositionsCreateWithUsdc = async (
	options,
) => {
	const [, cont, usdc] = await clientsUtilsSwapUsdcForStake(options.provider)

	return cont && usdc
		? {
				estimatedDev: options.usdcAmount
					? await cont.getEstimatedDevForUsdc(options.usdcAmount)
					: 'No usdcAmount provided',
				estimatedUsdc: options.devAmount
					? await cont.getEstimatedUsdcForDev(options.devAmount)
					: 'No devAmount provided',
				create: async () =>
					whenDefined(options.from, async (from) => {
						const usdcAmount = options.usdcAmount
							? options.usdcAmount
							: options.devAmount
							? await cont.getEstimatedUsdcForDev(options.devAmount)
							: 'Neither usdcAmount nor devAmount provided'
						const _overrides = {
							overrides: {
								...options.overrides?.overrides,
							},
						}

						const devAmountOut = options.devAmountOut
							? options.devAmountOut
							: options.usdcAmount
							? await cont.getEstimatedDevForUsdc(options.usdcAmount)
							: 'Neither devAmountOut nor usdcAmount provided'

						return approveIfNeeded({
							provider: options.provider,
							requiredAmount: usdcAmount,
							from,
							token: usdc,
							to: await cont.contract().getAddress(),
							callback: async () => {
								const deadline = options.deadline
									? options.deadline
									: ((await options.provider.provider?.getBlock('latest'))
											?.timestamp ?? Math.floor(new Date().getTime() / 1000)) +
									  300
								return options.gatewayAddress &&
									typeof options.gatewayBasisPoints === 'number'
									? cont.swapUsdcAndStakeDevCaller(
											options.destination,
											usdcAmount,
											devAmountOut,
											deadline,
											options.payload ?? ZeroHash,
											_overrides,
											options.gatewayAddress,
											options.gatewayBasisPoints.toString(),
									  )
									: cont.swapUsdcAndStakeDevCaller(
											options.destination,
											usdcAmount,
											devAmountOut,
											deadline,
											options.payload ?? ZeroHash,
											_overrides,
									  )
							},
						})
					}),
		  }
		: (undefined as never)
}
