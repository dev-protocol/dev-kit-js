import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { WaitForEventOptions } from '../market/authenticate'
import { waitForCreateMetrics } from '../utils/waitForCreateMetrics'

export type CreateCreateAndAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => (
	name: string,
	symbol: string,
	marketAddress: string,
	args: readonly string[],
	options: WaitForEventOptions
) => Promise<string>

export const createCreateAndAuthenticateCaller: CreateCreateAndAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => async (
	name: string,
	symbol: string,
	marketAddress: string,
	args: readonly string[],
	{ metricsFactory }: WaitForEventOptions
): Promise<string> => {
	const property = await execute({
		contract,
		method: 'createAndAuthenticate',
		args: [name, symbol, marketAddress, ...args],
		mutation: true,
		padEnd: 6,
		client,
	}).then(({ events }) => events.Create.returnValues._property as string)

	return waitForCreateMetrics(client, property, metricsFactory)
}
