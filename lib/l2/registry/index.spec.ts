import { ethers } from 'ethers'
import { createRegistryContract, RegistryContract } from '.'
import { addressRegistryAbi } from './abi'
import { createRegistriesCaller } from './registries'

jest.mock('./registries')
jest.mock('ethers')

describe('registry/index.ts', () => {
	;(createRegistriesCaller as jest.Mock).mockImplementation(() => 123)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)

	describe('createRegistryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => RegistryContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...addressRegistryAbi],
					provider
				)

				return {
					registries: createRegistriesCaller(contract),
					contract: () => contract,
				}
			}

			const result = createRegistryContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
