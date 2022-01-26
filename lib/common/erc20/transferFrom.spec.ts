import { createTransferFromCaller } from './transferFrom'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('transferFrom.spec.ts', () => {
	describe('createTransferFromCaller', () => {
		it('call success', async () => {
			const success = true
			const from = '0x1E9342827907CD370CB8Ba2F768d7D50b2f457F9'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const contract = {
				transferFrom: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (from: string, to: string, value: number) =>
						stubbedSendTx()
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTransferFromCaller(contract as any)

			const result = await caller(from, to, value)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const from = '0x1E9342827907CD370CB8Ba2F768d7D50b2f457F9'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const contract = {
				transferFrom: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (from: string, to: string, value: number) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTransferFromCaller(contract as any)

			const result = await caller(from, to, value).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
