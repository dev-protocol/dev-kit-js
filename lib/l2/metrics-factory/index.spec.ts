import { ethers } from 'ethers'
import { createMetricsFactoryContract, CreateMetricsFactoryContract } from '.'
import { metricsFactoryAbi } from './abi'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'

jest.mock('./authenticatedPropertiesCount')

describe('metrics-factory.ts', () => {
	;(createAuthenticatedPropertiesCountCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createMetricsFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => CreateMetricsFactoryContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...metricsFactoryAbi],
					provider
				)
				return {
					authenticatedPropertiesCount:
						createAuthenticatedPropertiesCountCaller(contract),
				}
			}

			const result = createMetricsFactoryContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
