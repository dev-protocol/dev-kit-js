import Web3 from 'web3'
import { createPropertyFactoryContract, PropertyFactoryContract } from '.'
import { createCreatePropertyCaller } from './createProperty'
import { propertyFactoryAbi } from './abi'
import { CustomOptions } from '../option'

describe('property/index.ts', () => {
	describe('createPropertyFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PropertyFactoryContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const propertyFactoryContract = new client.eth.Contract(
					propertyFactoryAbi,
					address,
					{
						...options
					}
				)

				return {
					createProperty: createCreatePropertyCaller(
						propertyFactoryContract,
						client
					)
				}
			}

			const result = createPropertyFactoryContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
