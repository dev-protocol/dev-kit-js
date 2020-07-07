import Web3 from 'web3'
import { createPolicySetContract, PolicySetContract } from '.'
import { createCountCaller } from './count'
import { createGetCaller } from './get'
import { policySetAbi } from './abi'
import { CustomOptions } from '../option'

describe('policy-set/index.ts', () => {
	describe('createPolicySetContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PolicySetContract = (address?: string, options?: CustomOptions) => {
				const policySetContract = new client.eth.Contract(
					[...policySetAbi],
					address,
					{
						...options,
					}
				)

				return {
					count: createCountCaller(policySetContract),
					get: createGetCaller(policySetContract),
				}
			}

			const result = createPolicySetContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
