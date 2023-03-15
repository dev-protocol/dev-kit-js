import { ethers } from 'ethers'
import { createPropertyFactoryContract, PropertyFactoryContract } from '.'
import { propertyFactoryAbi } from './abi'
import { createCreatePropertyCaller } from './create'
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'

jest.mock('./create')
jest.mock('./createAndAuthenticate')
jest.mock('ethers')

describe('property/index.ts', () => {
	;(createCreatePropertyCaller as jest.Mock).mockImplementation(() => 123)
	;(createCreateAndAuthenticateCaller as jest.Mock).mockImplementation(
		() => 123
	)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)
	describe('createPropertyFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

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
					contract: () => contract,
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
