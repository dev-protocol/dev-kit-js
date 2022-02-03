import { ethers } from 'ethers'
import { createPolicyGroupContract, PolicyGroupContract } from '.'
import { createIsGroupCaller } from './isGroup'
import { createIsDuringVotingPeriodCaller } from './isDuringVotingPeriod'
import { policyGroupAbi } from './abi'

jest.mock('./isGroup')
jest.mock('./isDuringVotingPeriod')

describe('policy-group/index.ts', () => {
	;(createIsGroupCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createIsDuringVotingPeriodCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)

	describe('createPolicyGroupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PolicyGroupContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...policyGroupAbi],
					provider
				)

				return {
					isGroup: createIsGroupCaller(contract),
					isDuringVotingPeriod: createIsDuringVotingPeriodCaller(contract),
					contract: () => contract,
				}
			}

			const result = createPolicyGroupContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
