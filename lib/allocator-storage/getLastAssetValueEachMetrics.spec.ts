import { createGetLastAssetValueEachMetricsCaller } from './getLastAssetValueEachMetrics'

describe('getLastAssetValueEachMetrics.spec.ts', () => {
	describe('createGetLastAssetValueEachMetricsCaller', () => {
		it('call failure', async () => {
			const error = 'error'

			const allocatorStorageContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					getLastAssetValueEachMetrics: (market: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetLastAssetValueEachMetricsCaller(
				allocatorStorageContract as any
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
