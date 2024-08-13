import { transferHistoryCaller } from './transferHistory'

describe('transferHistory.spec.ts', () => {
	describe('transferHistoryCaller', () => {
		it('call success', async () => {
			const value = [
				'value1',
				'value2',
				'value3',
				'value4',
				'value5',
				false,
				'value6',
			]

			const rewardContract = {
				transferHistory: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = transferHistoryCaller(rewardContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'123',
			)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const rewardContract = {
				transferHistory: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = transferHistoryCaller(rewardContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'123',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
