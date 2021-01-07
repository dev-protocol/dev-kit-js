/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { WaitForEventOptions } from '../market/authenticate'
import { waitForCreateMetrics } from '../utils/waitForCreateMetrics'
import { TxReceipt } from '../utils/web3-txs'
import { always } from 'ramda'

export type CreateCreateAndAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => (
	name: string,
	symbol: string,
	marketAddress: string,
	args: readonly string[],
	options: WaitForEventOptions
) => Promise<{
	readonly property: string
	readonly transaction: TxReceipt
	readonly waitForAuthentication: () => Promise<string>
}>

export const createCreateAndAuthenticateCaller: CreateCreateAndAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => async (
	name: string,
	symbol: string,
	marketAddress: string,
	args: readonly string[],
	{ metricsFactory }: WaitForEventOptions
): Promise<{
	readonly property: string
	readonly transaction: TxReceipt
	readonly waitForAuthentication: () => Promise<string>
}> => {
	const transaction = await execute({
		contract,
		method: 'createAndAuthenticate',
		args: [name, symbol, marketAddress, ...args],
		mutation: true,
		padEnd: 6,
		client,
	})
	const property = transaction.events.Create.returnValues._property as string
	return {
		property,
		transaction,
		waitForAuthentication: always(
			waitForCreateMetrics(client, property, metricsFactory)
		),
	}
}
