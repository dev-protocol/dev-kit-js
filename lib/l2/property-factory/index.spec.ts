import { ethers } from 'ethers'
import { createPropertyFactoryContract, PropertyFactoryContract } from '.'
import { propertyFactoryAbi } from './abi'
import { createCreatePropertyCaller } from '../../ethereum/property-factory/create'
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'
import { createGetPropertiesOfAuthorCaller } from './getPropertiesOfAuthor'

jest.mock('../../ethereum/property-factory/create')
jest.mock('./createAndAuthenticate')
jest.mock('./getPropertiesOfAuthor')

describe('property-factory/index.ts', () => {
	;(createCreatePropertyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createCreateAndAuthenticateCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createGetPropertiesOfAuthorCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createPropertyFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PropertyFactoryContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...propertyFactoryAbi],
					provider
				)
				return {
					create: createCreatePropertyCaller(contract),
					createAndAuthenticate: createCreateAndAuthenticateCaller(
						contract,
						provider
					),
					getPropertiesOfAuthor: createGetPropertiesOfAuthorCaller(contract)
				}
			}

			const result = createPropertyFactoryContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
