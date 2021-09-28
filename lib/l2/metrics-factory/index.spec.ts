import Web3 from 'web3'
import { createMetricsFactoryContract, CreateMetricsFactoryContract } from '.'
import { CustomOptions } from '../../common/option'
import { metricsFactoryAbi } from './abi'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'

describe('metrics-factory.ts', () => {
	describe('createMetricsFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => CreateMetricsFactoryContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const metricsFactoryContract = new client.eth.Contract(
					[...metricsFactoryAbi],
					address,
					{
						...options,
					}
				)
				return {
					authenticatedPropertiesCount:
						createAuthenticatedPropertiesCountCaller(metricsFactoryContract),
					contract: () => metricsFactoryContract,
				}
			}

			const result = createMetricsFactoryContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
