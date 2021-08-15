import Web3 from 'web3'
import { CustomOptions } from '../option'
import { createMetricsContract, CreateMetricsContract } from '.'
import { createPropertyCaller } from './property'
import { createMarketCaller } from './market'
import { metricsAbi } from './abi'

describe('allocator/index.ts', () => {
	describe('createAllocatorContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => CreateMetricsContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const metricsContract = new client.eth.Contract(
					[...metricsAbi],
					address,
					{
						...options,
					}
				)
				return {
					property: createPropertyCaller(metricsContract),
					market: createMarketCaller(metricsContract),
					contract: () => metricsContract,
				}
			}

			const result = createMetricsContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
