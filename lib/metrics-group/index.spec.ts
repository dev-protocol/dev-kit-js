import Web3 from 'web3'
import { createMetricsGroupContract, CreateMetricsGroupContract } from '.'
import { CustomOptions } from '../option'
import { metricsGroupAbi } from './abi'
import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties'

describe('metrics-group.ts', () => {
	describe('createMetricsGroupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => CreateMetricsGroupContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const metricsGroupContract = new client.eth.Contract(
					[...metricsGroupAbi],
					address,
					{
						...options,
					}
				)
				return {
					totalAuthenticatedProperties: createTotalAuthenticatedPropertiesCaller(
						metricsGroupContract
					),
					contract: () => metricsGroupContract,
				}
			}

			const result = createMetricsGroupContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
