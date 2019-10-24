import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { marketAbi } from './abi'
import { CustomOptions } from '../option'

export const createBaseSchemaCaller = async (
	contract: Contract
): Promise<string> => contract.methods.schema().call()

export const createSchemaCaller = (
	contract: Contract
): (() => Promise<string[]>) => async () =>
	createBaseSchemaCaller(contract).then(
		result => JSON.parse(result) as string[]
	)

export interface CreateMarketContract {
	schema: () => Promise<string[]>
}

export const createMarketContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateMarketContract => {
	const contractClient: Contract = new client.eth.Contract(marketAbi, address, {
		...options
	})

	return {
		schema: createSchemaCaller(contractClient)
	}
}
