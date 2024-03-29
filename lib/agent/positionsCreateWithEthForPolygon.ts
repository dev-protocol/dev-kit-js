/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import { clientsUtilsSwapForStake } from './common/clients/clientsUtilsSwapForStake'
import { ContractRunner, ZeroHash } from 'ethers'
import {
	approveIfNeeded,
	ApproveIfNeededResult,
} from './common/approveIfNeeded'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'

type PositionsCreateWithEthForPolygon = (options: {
	readonly provider: ContractRunner
	readonly ethAmount?: string
	readonly devAmount?: string
	readonly destination: string
	readonly from?: string
	readonly overrides?: FallbackableOverrides
	readonly payload?: string | Uint8Array
	readonly deadline?: number
	readonly gatewayAddress?: string
	readonly gatewayBasisPoints?: number
}) => Promise<{
	readonly estimatedDev: string
	readonly estimatedEth: string
	readonly create: () => Promise<UndefinedOr<ApproveIfNeededResult>>
}>

export const positionsCreateWithEthForPolygon: PositionsCreateWithEthForPolygon =
	async (options) => {
		const [, l2, weth] = await clientsUtilsSwapForStake(options.provider)

		return l2 && weth
			? {
					estimatedDev: options.ethAmount
						? await l2.getEstimatedDevForEth(options.ethAmount)
						: 'No ethAmount provided',
					estimatedEth: options.devAmount
						? await l2.getEstimatedEthForDev(options.devAmount)
						: 'No devAmount provided',
					create: async () =>
						whenDefined(options.from, async (from) => {
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

							return approveIfNeeded({
								provider: options.provider,
								requiredAmount: ethAmount,
								from,
								token: weth,
								to: await l2.contract().getAddress(),
								callback: async () => {
									const deadline = options.deadline
										? options.deadline
										: ((await options.provider.provider?.getBlock('latest'))
												?.timestamp ??
												Math.floor(new Date().getTime() / 1000)) + 300
									return options.gatewayAddress &&
										typeof options.gatewayBasisPoints === 'number'
										? l2.swapEthAndStakeDevPolygonCaller(
												options.destination,
												ethAmount,
												deadline,
												options.payload ?? ZeroHash,
												_overrides,
												options.gatewayAddress,
												String(options.gatewayBasisPoints),
										  )
										: l2.swapEthAndStakeDevPolygonCaller(
												options.destination,
												ethAmount,
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
