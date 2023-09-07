/* eslint-disable functional/functional-parameters */
import { FallbackableOverrides } from '../common/utils/execute'
import { clientsUtilsSwapTokensForStake } from './common/clients/clientsUtilsSwapTokensForStake'
import { ZeroAddress, type ContractRunner, TransactionResponse } from 'ethers'
import {
	approveIfNeeded,
	ApproveIfNeededResult,
} from './common/approveIfNeeded'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'
import { BigNumber } from 'bignumber.js'

type Params = {
	readonly provider: ContractRunner
	readonly mintTo: string
	readonly destination: string
	readonly path: readonly (string | bigint)[]
	readonly token?: undefined
	readonly tokenAmount?: string
	readonly devAmount?: string
	readonly devAmountOut?: string
	readonly from?: string
	readonly overrides?: FallbackableOverrides
	readonly payload?: string | Uint8Array
	readonly deadline?: number
	readonly gatewayAddress?: string
	readonly gatewayBasisPoints?: number
}

type ParamsWithToken = Omit<Params, 'token'> & {
	readonly token: string
}

const hasTokens = (
	options: Params | ParamsWithToken,
): options is ParamsWithToken =>
	options.token !== undefined && options.token !== ZeroAddress

export type ReturnOfPositionsCreateWithAnyTokensERC20 = Promise<
	UndefinedOr<{
		readonly estimatedDev: string
		readonly estimatedTokens: string
		readonly create: () => Promise<ApproveIfNeededResult>
	}>
>

export type ReturnOfPositionsCreateWithAnyTokensNative = Promise<
	UndefinedOr<{
		readonly estimatedDev: string
		readonly estimatedTokens: string
		readonly create: () => Promise<TransactionResponse>
	}>
>

export function positionsCreateWithAnyTokens(
	opts: ParamsWithToken,
): ReturnOfPositionsCreateWithAnyTokensERC20
export function positionsCreateWithAnyTokens(
	opts: Params,
): ReturnOfPositionsCreateWithAnyTokensNative

export async function positionsCreateWithAnyTokens(
	options: ParamsWithToken | Params,
): Promise<unknown> {
	const [, cont] = await clientsUtilsSwapTokensForStake(options.provider)
	const useERC20 = hasTokens(options)

	return cont
		? {
				estimatedDev: options.tokenAmount
					? await cont.getEstimatedDevForTokens(
							options.path,
							options.tokenAmount,
					  )
					: 'No tokenAmount provided',
				estimatedTokens: options.devAmount
					? await cont.getEstimatedTokensForDev(options.path, options.devAmount)
					: 'No devAmount provided',
				create: async () => {
					const tokenAmount = options.tokenAmount
						? options.tokenAmount
						: options.devAmount
						? await cont.getEstimatedTokensForDev(
								options.path,
								options.devAmount,
						  )
						: 'Neither tokenAmount nor devAmount provided'
					const _overrides = {
						overrides: {
							...{ value: useERC20 ? undefined : tokenAmount },
							...options.overrides?.overrides,
						},
					}

					const devAmountOut = options.devAmountOut
						? options.devAmountOut
						: options.tokenAmount
						? await cont.getEstimatedDevForTokens(
								options.path,
								typeof options.gatewayBasisPoints === 'number'
									? new BigNumber(options.tokenAmount)
											.times(
												new BigNumber(10000)
													.minus(options.gatewayBasisPoints)
													.div(10000),
											)
											.times(0.8) // x0.8 = Hardcoded tolerance for quote and transaction differences
											.dp(0)
											.toFixed()
									: options.tokenAmount,
						  )
						: 'Neither devAmountOut nor tokenAmount provided'
					const deadline = options.deadline
						? options.deadline
						: ((await options.provider.provider?.getBlock('latest'))
								?.timestamp ?? Math.floor(new Date().getTime() / 1000)) + 300

					return useERC20
						? whenDefined(options.from, async (from) => {
								return approveIfNeeded({
									provider: options.provider,
									requiredAmount: tokenAmount,
									from,
									token: options.token,
									to: await cont.contract().getAddress(),
									callback: async () => {
										return options.gatewayAddress &&
											typeof options.gatewayBasisPoints === 'number'
											? cont.swapTokensAndStakeDev(
													options.mintTo,
													options.path,
													options.destination,
													devAmountOut,
													deadline,
													tokenAmount,
													options.payload,
													options.token,
													options.gatewayAddress,
													options.gatewayBasisPoints.toString(),
													_overrides,
											  )
											: cont.swapTokensAndStakeDev(
													options.mintTo,
													options.path,
													options.destination,
													devAmountOut,
													deadline,
													tokenAmount,
													options.payload,
													options.token,
													undefined,
													undefined,
													_overrides,
											  )
									},
								})
						  })
						: options.gatewayAddress &&
						  typeof options.gatewayBasisPoints === 'number'
						? cont.swapTokensAndStakeDev(
								options.mintTo,
								options.path,
								options.destination,
								devAmountOut,
								deadline,
								tokenAmount,
								options.payload,
								undefined,
								options.gatewayAddress,
								options.gatewayBasisPoints.toString(),
								_overrides,
						  )
						: cont.swapTokensAndStakeDev(
								options.mintTo,
								options.path,
								options.destination,
								devAmountOut,
								deadline,
								tokenAmount,
								options.payload,
								undefined,
								undefined,
								undefined,
								_overrides,
						  )
				},
		  }
		: undefined
}
