import { createMarketApprovalCaller } from './marketApproval'

describe('marketApproval.spec.ts', () => {
	describe('createMarketApprovalCaller', () => {
		it('call success', async () => {
			const value = true

			const policyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					marketApproval: (agree: string, opposite: string) => ({
						call: jest.fn().mockImplementation(async () => value),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMarketApprovalCaller(policyContract as any)

			const result = await caller('11111111', '2222222222')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					marketApproval: (policy: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMarketApprovalCaller(policyContract as any)

			const result = await caller('11111111', '2222222222').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
