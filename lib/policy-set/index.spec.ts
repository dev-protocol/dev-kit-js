import { ethers } from 'ethers'
import { createPolicySetContract, PolicySetContract } from '.'
import { createCountCaller } from './count'
import { createGetCaller } from './get'
import { policySetAbi } from './abi'

jest.mock('./count')
jest.mock('./get')

describe('policy-set/index.ts', () => {
	;(createCountCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createGetCaller as jest.Mock).mockImplementation((contract) => contract)
	describe('createPolicySetContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'

			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PolicySetContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...policySetAbi],
					provider
				)

				return {
					count: createCountCaller(contract),
					get: createGetCaller(contract),
				}
			}

			const result = createPolicySetContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
