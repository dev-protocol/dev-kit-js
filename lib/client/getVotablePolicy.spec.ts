/* eslint-disable functional/no-class */
import { createGetVotablePolicy } from './getVotablePolicy'
import { createPolicySetContract } from '../policy-set'

describe('getVotablePolicy.ts', () => {
	describe('createGetVotablePolicy', () => {
		it('returns an array of a Policy address', async () => {
			const value = [
				'0x1111111111111111111111111111111111111111',
				'0x2222222222222222222222222222222222222222',
				'0x3333333333333333333333333333333333333333',
				'0x4444444444444444444444444444444444444444',
			]

			const client = {
				eth: {
					Contract: class {
						public readonly methods = {
							count: () => ({
								call: jest.fn().mockImplementation(async () => 4),
							}),
							get: (index: string) => ({
								call: jest
									.fn()
									.mockImplementation(async () => value[Number(index)]),
							}),
						}
					},
				},
			}
			const policySet = createPolicySetContract(client as any)()
			const result = await createGetVotablePolicy(policySet)()
			const expected = value

			expect(result).toEqual(expected)
		})
		it('returns a result with ignoring zero address', async () => {
			const value = [
				'0x0000000000000000000000000000000000000000',
				'0x1111111111111111111111111111111111111111',
				'0x2222222222222222222222222222222222222222',
				'0x3333333333333333333333333333333333333333',
				'0x4444444444444444444444444444444444444444',
			]

			const client = {
				eth: {
					Contract: class {
						public readonly methods = {
							count: () => ({
								call: jest.fn().mockImplementation(async () => 5),
							}),
							get: (index: string) => ({
								call: jest
									.fn()
									.mockImplementation(async () => value[Number(index)]),
							}),
						}
					},
				},
			}
			const policySet = createPolicySetContract(client as any)()
			const result = await createGetVotablePolicy(policySet)()
			const expected = value.filter(
				(x) => x !== '0x0000000000000000000000000000000000000000'
			)

			expect(result).toEqual(expected)
		})
	})
})
