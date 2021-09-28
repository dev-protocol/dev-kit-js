import Web3 from 'web3'
import { createRegistryContract, RegistryContract } from '.'
import { addressRegistryAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createPolicyCaller } from './policy'

describe('registry/index.ts', () => {
	describe('createRegistryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => RegistryContract = (address?: string, options?: CustomOptions) => {
				const registryContract = new client.eth.Contract(
					[...addressRegistryAbi],
					address,
					{
						...options,
					}
				)
				return {
					policy: createPolicyCaller(registryContract),
					contract: () => registryContract,
				}
			}

			const result = createRegistryContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
