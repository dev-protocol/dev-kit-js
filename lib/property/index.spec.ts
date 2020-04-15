import Web3 from 'web3'
import { createPropertyContract, PropertyContract } from '.'
import { createOwnerCaller } from './owner'
import { createTransferCaller } from './transfer'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'

describe('property/index.ts', () => {
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PropertyContract = (address?: string, options?: CustomOptions) => {
				const propertyContract = new client.eth.Contract(propertyAbi, address, {
					...options
				})
				return {
					owner: createOwnerCaller(propertyContract),
					transfer: createTransferCaller(propertyContract, client)
				}
			}

			const result = createPropertyContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
