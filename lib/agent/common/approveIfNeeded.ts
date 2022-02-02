/* eslint-disable functional/functional-parameters */
import { UndefinedOr, whenDefinedAll } from '@devprotocol/util-ts'
import {
	TransactionResponse,
	TransactionReceipt,
} from '@ethersproject/abstract-provider'
import { Provider } from '@ethersproject/abstract-provider'
import { BigNumber } from 'ethers'
import { FallbackableOverrides } from '../../common/utils/execute'
import { devClients } from './clients/devClients'

export const approveIfNeeded =
	(factoryOptions: {
		readonly provider: Provider
		readonly requiredAmount: string
		readonly from: string
		readonly to?: string
		readonly callback: (
			receipt?: TransactionReceipt
		) => UndefinedOr<Promise<TransactionResponse>>
	}) =>
	async (options: {
		readonly amount?: string
		readonly overrides?: FallbackableOverrides
	}) => {
		const [l1, l2] = await devClients(factoryOptions.provider)
		const client = l1 ?? l2
		const allowance = await whenDefinedAll(
			[client, factoryOptions.to],
			([x, to]) => x.allowance(factoryOptions.from, to)
		)
		const callback = {
			wait: () => factoryOptions.callback(),
		}

		return (
			whenDefinedAll([client, factoryOptions.to], async ([dev, to]) => {
				return BigNumber.from(allowance).lt(factoryOptions.requiredAmount)
					? ((approve) => ({
							...approve,
							wait: async () => {
								const repeipt = await approve.wait()
								return factoryOptions.callback(repeipt)
							},
					  }))(
							await dev.approve(
								to,
								options.amount ?? factoryOptions.requiredAmount,
								options.overrides
							)
					  )
					: callback
			}) ?? callback
		)
	}
