import Web3 from 'web3'
import { createPolicyFactoryContract, PolicyFactoryContract } from '.'
import { policyFactoryAbi } from './abi'
import { CustomOptions } from '../option'
import { createConvergePolicyCaller } from './convergePolicy'
import { createCreateCaller } from './create'
import { createForceAttachCaller } from './forceAttach'

describe('policy/index.ts', () => {
	describe('createPolicyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PolicyFactoryContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const policyContract = new client.eth.Contract(
					[...policyFactoryAbi],
					address,
					{
						...options,
					}
				)

				return {
					create: createCreateCaller(policyContract, client),
					convergePolicy: createConvergePolicyCaller(policyContract, client),
					forceAttach: createForceAttachCaller(policyContract, client),
					contract: () => policyContract,
				}
			}

			const result = createPolicyFactoryContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
