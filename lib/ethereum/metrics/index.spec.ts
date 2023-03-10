import { ethers } from 'ethers'
import { createMetricsContract, CreateMetricsContract } from '.'
import { createPropertyCaller } from './property'
import { createMarketCaller } from './market'
import { metricsAbi } from './abi'

jest.mock('./property')
jest.mock('./market')

describe('metrics/index.ts', () => {
	;(createPropertyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMarketCaller as jest.Mock).mockImplementation((contract) => contract)
	describe('createMetricsContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => CreateMetricsContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...metricsAbi], provider)
				return {
					property: createPropertyCaller(contract),
					market: createMarketCaller(contract),
					contract: () => contract,
				}
			}

			const result = createMetricsContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
