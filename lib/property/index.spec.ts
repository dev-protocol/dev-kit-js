import { ethers } from 'ethers'
import { createPropertyContract, PropertyContract } from '.'
import { createOwnerCaller } from './owner'
import { createTransferCaller } from './transfer'
import { propertyAbi } from './abi'

jest.mock('./owner')
jest.mock('./transfer')

describe('property/index.ts', () => {
	;(createOwnerCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createTransferCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'

			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PropertyContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...propertyAbi],
					provider
				)
				return {
					owner: createOwnerCaller(contract),
					transfer: createTransferCaller(contract),
				}
			}

			const result = createPropertyContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
