import { SendTx } from './web3-txs'
import { txPromisify } from './txPromisify'

// eslint-disable-next-line @typescript-eslint/promise-function-async
const mock = (
	confirmationEvent: string,
	reject = false,
	rejectOnConfirmation = false
): SendTx =>
	(({
		on(event: string, cb: (...args: any[]) => void) {
			if (event === 'confirmation') {
				setTimeout(() => {
					if (rejectOnConfirmation) {
						cb(0, {
							status: false,
						})
					} else {
						cb(0, {
							status: true,
							events: { [confirmationEvent]: { event: confirmationEvent } },
						})
					}
				}, 100)
			}

			if (event === 'error' && reject) {
				setTimeout(() => {
					cb(new Error('Transaction error'))
				}, 90)
			}

			return this
		},
	} as unknown) as SendTx)

describe('txPromisify.ts', () => {
	describe('txPromisify', () => {
		it('Returns promise that solves with "confirmation" of the transaction event', async () => {
			const result = await txPromisify(mock('Test'))
			expect(result.events.Test.event).toBe('Test')
		})

		it('Throw an error when that occurred on "confirmation" of the transaction event', async () => {
			const result = await txPromisify(mock('Test', false, true)).catch(
				(err: Error) => err
			)
			expect((result as Error).message).toBe(
				'An error occurred in the transaction.'
			)
			expect(result).toBeInstanceOf(Error)
		})

		it('Throw an error when that occurred on the transaction', async () => {
			const result = await txPromisify(mock('Test', true)).catch(
				(err: Error) => err
			)
			expect((result as Error).message).toBe('Transaction error')
			expect(result).toBeInstanceOf(Error)
		})
	})
})
