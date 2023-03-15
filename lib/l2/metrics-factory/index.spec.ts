import { ethers } from 'ethers'
import { createMetricsFactoryContract, MetricsFactoryContract } from '.'
import { metricsFactoryAbi } from './abi'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'
import { createMetricsOfPropertyCaller } from './metricsOfProperty'
import { createMetricsCountCaller } from './metricsCount'

jest.mock('./authenticatedPropertiesCount')
jest.mock('./metricsOfProperty')
jest.mock('./metricsCount')
jest.mock('ethers')

describe('metrics-factory.ts', () => {
	;(createAuthenticatedPropertiesCountCaller as jest.Mock).mockImplementation(
		() => 123
	)
	;(createMetricsOfPropertyCaller as jest.Mock).mockImplementation(() => 123)
	;(createMetricsCountCaller as jest.Mock).mockImplementation(() => 123)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)
	describe('createMetricsFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => MetricsFactoryContract = (
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
					metricsCount: createMetricsCountCaller(contract),
					metricsOfProperty: createMetricsOfPropertyCaller(contract),
					contract: () => contract,
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
