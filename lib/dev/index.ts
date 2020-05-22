import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { devAbi } from './abi'
import { CustomOptions } from '../option'
import { createTransferCaller } from './transfer'
import { createDepositCaller } from './deposit'
import { createBalanceOfCaller } from './balanceOf'

export type DevContract = {
	readonly balanceOf: (address: string) => Promise<string>
	readonly transfer: (to: string, value: string) => Promise<boolean>
	readonly deposit: (to: string, value: string) => Promise<boolean>
}

export type CreateDevContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => DevContract

export const createDevContract: CreateDevContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): DevContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...devAbi],
		address,
		{
			...options,
		}
	)

	return {
		balanceOf: createBalanceOfCaller(contractClient),
		transfer: createTransferCaller(contractClient, client),
		deposit: createDepositCaller(contractClient, client),
	}
}
