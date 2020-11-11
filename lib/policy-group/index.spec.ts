import Web3 from 'web3'
import { createPolicyGroupContract, PolicyGroupContract } from '.'
import { createVotingCaller } from './voting'
import { createIsGroupCaller } from './isGroup'
import { policyGroupAbi } from './abi'
import { CustomOptions } from '../option'

describe('policy-group/index.ts', () => {
	describe('createPolicyGroupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PolicyGroupContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const policyGroupContract = new client.eth.Contract(
					[...policyGroupAbi],
					address,
					{
						...options,
					}
				)

				return {
					voting: createVotingCaller(policyGroupContract),
					isGroup: createIsGroupCaller(policyGroupContract),
					contract: () => policyGroupContract,
				}
			}

			const result = createPolicyGroupContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
