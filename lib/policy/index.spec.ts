import Web3 from 'web3'
import { createPolicyContract, PolicyContract } from '.'
import { createHoldersShareCaller } from './holdersShare'
import { policyAbi } from './abi'
import { CustomOptions } from '../option'

describe('policy/index.ts', () => {
	describe('createPolicyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PolicyContract = (address?: string, options?: CustomOptions) => {
				const policyContract = new client.eth.Contract(
					[...policyAbi],
					address,
					{
						...options,
					}
				)

				return {
					holdersShare: createHoldersShareCaller(policyContract),
					contract: () => policyContract,
				}
			}

			const result = createPolicyContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
