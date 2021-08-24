/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/execute'

export type CreateCreatePropertyCaller = (
	contract: ethers.Contract
) => (name: string, symbol: string, author: string) => Promise<string>

export const createCreatePropertyCaller: CreateCreatePropertyCaller =
	(contract) =>
	async (name: string, symbol: string, author: string): Promise<string> => {
		await execute<MutationOption>({
			contract,
			method: 'create',
			args: [name, symbol, author],
			mutation: true,
		})

		return new Promise((resolve, reject) => {
			const subscribedContract = contract.on(
				'Create',
				async (contractAddress: string, propertyAddress: string) => {
					if (contract.address === contractAddress) {
						subscribedContract.removeAllListeners()
						resolve(propertyAddress)
					} else {
						reject('Invalid contract address.')
					}
				}
			)
		})
	}
