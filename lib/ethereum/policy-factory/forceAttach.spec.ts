import { createForceAttachCaller } from './forceAttach'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('forceAttach.spec.ts', () => {
	describe('createForceAttachCaller', () => {
		it('call success', async () => {
			const success = stubTransactionResposeFactory({})
			const policy = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const devContract = {
				forceAttach: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (policy: string) => success),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createForceAttachCaller(devContract as any)

			const result = await caller(policy)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const policy = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const error = 'error'

			const devContract = {
				forceAttach: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createForceAttachCaller(devContract as any)

			const result = await caller(policy).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
