/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { txPromisify } from './txPromisify'
import { stubbedSendTx } from './for-test'

describe('txPromisify.ts', () => {
	describe('txPromisify', () => {
		it('Returns promise that solves with "confirmation" of the transaction event', async () => {
			const result = await txPromisify(
				stubbedSendTx({ name: 'Test', property: 'test', value: 'test' })
			)
			expect(result.events.Test.event).toBe('Test')
		})

		it('Throw an error when that occurred on "confirmation" of the transaction event', async () => {
			const result = await txPromisify(
				stubbedSendTx(undefined, false, true)
			).catch((err: Error) => err)
			expect((result as Error).message).toBe(
				'An error occurred in the transaction.'
			)
			expect(result).toBeInstanceOf(Error)
		})

		it('Throw an error when that occurred on the transaction', async () => {
			const result = await txPromisify(stubbedSendTx(undefined, true)).catch(
				(err: Error) => err
			)
			expect((result as Error).message).toBe('Transaction error')
			expect(result).toBeInstanceOf(Error)
		})
	})
})
