/* eslint-disable functional/functional-parameters */
import { UndefinedOr, whenDefinedAll } from '@devprotocol/util-ts'
import {
	TransactionResponse,
	TransactionReceipt,
} from '@ethersproject/abstract-provider'
import { Provider } from '@ethersproject/abstract-provider'
import { BigNumber } from 'ethers'
import { FallbackableOverrides } from '../../common/utils/execute'
import { clientsDev } from './clients/clientsDev'

// eslint-disable-next-line functional/no-mixed-type
export type ApproveIfNeededResultForApproveIsNeeded = {
	readonly approvalNeeded: true
	readonly approveIfNeeded: (options?: {
		readonly amount?: string
		readonly overrides?: FallbackableOverrides
	}) => Promise<{
		readonly waitNeeded: true
		readonly waitOrSkipApproval: () => Promise<
			TransactionReceipt & { readonly run: () => Promise<TransactionResponse> }
		>
	}>
}

// eslint-disable-next-line functional/no-mixed-type
export type ApproveIfNeededResultForApproveIsNotNeeded = {
	readonly approvalNeeded: false
	readonly approveIfNeeded: (options?: {
		readonly amount?: string
		readonly overrides?: FallbackableOverrides
	}) => Promise<{
		readonly waitNeeded: false
		readonly waitOrSkipApproval: () => Promise<{
			readonly run: () => Promise<TransactionResponse>
		}>
	}>
}

export type ApproveIfNeededResult =
	| ApproveIfNeededResultForApproveIsNeeded
	| ApproveIfNeededResultForApproveIsNotNeeded

export type ApproveIfNeeded = (factoryOptions: {
	readonly provider: Provider
	readonly requiredAmount: string
	readonly from: string
	readonly to?: string
	readonly callback: (
		receipt?: TransactionReceipt
	) => Promise<TransactionResponse>
}) => Promise<UndefinedOr<ApproveIfNeededResult>>

export const approveIfNeeded: ApproveIfNeeded = async (factoryOptions) => {
	const [l1, l2] = await clientsDev(factoryOptions.provider)
	const client = l1 ?? l2
	const allowance = await whenDefinedAll(
		[client, factoryOptions.to],
		([x, to]) => x.allowance(factoryOptions.from, to)
	)

	return whenDefinedAll([client, factoryOptions.to], async ([dev, to]) => {
		return BigNumber.from(allowance).lt(factoryOptions.requiredAmount)
			? ({
					approvalNeeded: true,
					approveIfNeeded: async (options) => {
						const res = await dev.approve(
							to,
							options?.amount ?? factoryOptions.requiredAmount,
							options?.overrides
						)
						return {
							...res,
							waitNeeded: true,
							waitOrSkipApproval: async () => {
								const repeipt = await res.wait()
								return {
									...repeipt,
									run: () => factoryOptions.callback(repeipt),
								}
							},
						}
					},
			  } as ApproveIfNeededResultForApproveIsNeeded)
			: ({
					approvalNeeded: false,
					approveIfNeeded: async (options) => {
						return {
							waitNeeded: false,
							waitOrSkipApproval: async () => ({
								run: () => factoryOptions.callback(),
							}),
						}
					},
			  } as ApproveIfNeededResultForApproveIsNotNeeded)
	})
}
