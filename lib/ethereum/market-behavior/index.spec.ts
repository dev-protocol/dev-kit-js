import { ethers } from 'ethers'
import { createMarketBehaviorContract, CreateMarketBehaviorContract } from '.'
import { createGetIdCaller } from './getId'
import { createGetMetricsCaller } from './getMetrics'
import { marketBehaviorAbi } from './abi'

jest.mock('./getId')

describe('getId/index.ts', () => {
	;(createGetIdCaller as jest.Mock).mockImplementation((contract) => contract)
	describe('createMarketBehaviorContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => CreateMarketBehaviorContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...marketBehaviorAbi],
					provider
				)
				return {
					getId: createGetIdCaller(contract),
					getMetrics: createGetMetricsCaller(contract),
					contract: () => contract,
				}
			}

			const result = createMarketBehaviorContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
