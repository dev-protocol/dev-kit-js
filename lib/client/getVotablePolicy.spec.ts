/* eslint-disable functional/no-class */
import bent from 'bent'
import { createGetVotablePolicy } from './getVotablePolicy'
import { createPolicyGroupContract } from '../policy-group'

jest.mock('bent')

describe('getVotablePolicy.ts', () => {
	describe('createGetVotablePolicy', () => {
		it('returns an array of a Policy address', async () => {
			const graphql = [
				'0x1111111111111111111111111111111111111111',
				'0x2222222222222222222222222222222222222222',
				'0x3333333333333333333333333333333333333333',
				'0x4444444444444444444444444444444444444444',
			]
			const isGroup = [
				'0x1111111111111111111111111111111111111111',
				'0x2222222222222222222222222222222222222222',
			]

			;(bent as unknown as jest.Mock).mockImplementationOnce(
				() => async () => ({
					data: {
						policy_factory_create: graphql.map((v) => ({
							policy_address: v,
						})),
					},
				})
			)

			const client = {
				eth: {
					Contract: class {
						public readonly methods = {
							isGroup: (address: string) => ({
								call: jest
									.fn()
									.mockImplementation(async () => isGroup.includes(address)),
							}),
						}
					},
				},
			}
			const policyGroup = createPolicyGroupContract(client as any)('')
			const result = await createGetVotablePolicy(policyGroup)()
			const expected = isGroup

			expect(result).toEqual(expected)
		})
	})
})
