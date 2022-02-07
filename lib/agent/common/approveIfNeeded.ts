/* eslint-disable functional/functional-parameters */
import { whenDefinedAll } from '@devprotocol/util-ts'
import {
	TransactionResponse,
	TransactionReceipt,
} from '@ethersproject/abstract-provider'
import { Provider } from '@ethersproject/abstract-provider'
import { BigNumber } from 'ethers'
import { FallbackableOverrides } from '../../common/utils/execute'
import { devClients } from './clients/devClients'

type ApproveIfNeeded = (factoryOptions: {
	readonly provider: Provider
	readonly requiredAmount: string
	readonly from: string
	readonly to?: string
	readonly callback: (
		receipt?: TransactionReceipt
	) => Promise<TransactionResponse>
}) => (options?: {
	readonly amount?: string
	readonly overrides?: FallbackableOverrides
}) => Promise<{
	readonly waitOrSkip: () => Promise<TransactionResponse>
}>

export const approveIfNeeded: ApproveIfNeeded =
	(factoryOptions) => async (options) => {
		const [l1, l2] = await devClients(factoryOptions.provider)
		const client = l1 ?? l2
		const allowance = await whenDefinedAll(
			[client, factoryOptions.to],
			([x, to]) => x.allowance(factoryOptions.from, to)
		)
		const callback = {
			waitOrSkip: () => factoryOptions.callback(),
		} as const

		return (
			whenDefinedAll([client, factoryOptions.to], async ([dev, to]) => {
				return BigNumber.from(allowance).lt(factoryOptions.requiredAmount)
					? ((approve) =>
							({
								...approve,
								waitOrSkip: async () => {
									const repeipt = await approve.wait()
									return factoryOptions.callback(repeipt)
								},
							} as const))(
							await dev.approve(
								to,
								options?.amount ?? factoryOptions.requiredAmount,
								options?.overrides
							)
					  )
					: callback
			}) ?? callback
		)
	}
