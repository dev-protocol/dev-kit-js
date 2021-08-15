import { ethers } from 'ethers'
import { createPolicyContract, PolicyContract } from '.'
import { createHoldersShareCaller } from './holdersShare'
import { policyAbi } from './abi'

jest.mock('./holdersShare')

describe('policy/index.ts', () => {
	describe('createPolicyContract', () => {
		;(createHoldersShareCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'

			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PolicyContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...policyAbi], provider)

				return {
					holdersShare: createHoldersShareCaller(contract),
				}
			}

			const result = createPolicyContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
