import { ethers } from 'ethers'
import { createMetricsGroupContract, CreateMetricsGroupContract } from '.'
import { metricsGroupAbi } from './abi'
import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties'
import { createTotalIssuedMetrics } from './totalIssuedMetrics'

jest.mock('./totalAuthenticatedProperties')
jest.mock('./totalIssuedMetrics')

describe('metrics-group.ts', () => {
	;(createTotalAuthenticatedPropertiesCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTotalIssuedMetrics as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createMetricsGroupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => CreateMetricsGroupContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...metricsGroupAbi],
					provider
				)
				return {
					totalAuthenticatedProperties:
						createTotalAuthenticatedPropertiesCaller(contract),
					totalIssuedMetrics: createTotalIssuedMetrics(contract),
					contract: () => contract,
				}
			}

			const result = createMetricsGroupContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
