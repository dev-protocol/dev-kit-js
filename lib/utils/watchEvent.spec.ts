/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { Event } from './web3-txs'
import { watchEvent } from './watchEvent'

const mock = (err: Readonly<Error> | null, event: Event): Contract =>
	(({
		events: {
			allEvents(
				_: any,
				callback: (err: Readonly<Error> | null, e: Event) => void
			): void {
				callback(err, event)
			},
		},
	} as unknown) as Contract)

describe('watchEvent.ts', () => {
	describe('watchEvent', () => {
		it('Returns promise that solves by emitting an event matches passed options', async () => {
			const res = await watchEvent({
				contract: mock(null, ({
					event: 'test',
					returnValues: {
						MyParam: 1,
					},
				} as unknown) as Event),
				resolver: async (e) =>
					e.event === 'test' && e.returnValues.MyParam === 1 ? true : false,
			})
			expect(res).toEqual({
				event: 'test',
				returnValues: {
					MyParam: 1,
				},
			})
		})

		it('Passing `fromBlock` option when it exists', async () => {
			const mockFn = jest.fn().mockImplementation(() => {})
			watchEvent({
				fromBlock: 123456,
				contract: ({
					events: {
						allEvents: mockFn,
					},
				} as unknown) as Contract,
				resolver: (() => undefined) as any,
			})
			expect(mockFn.mock.calls[0][0]).toEqual({
				fromBlock: 123456,
				toBlock: 'latest',
			})
		})

		it('`fromBlock` is 0 by default', async () => {
			const mockFn = jest.fn().mockImplementation(() => {})
			watchEvent({
				contract: ({
					events: {
						allEvents: mockFn,
					},
				} as unknown) as Contract,
				resolver: (() => undefined) as any,
			})
			expect(mockFn.mock.calls[0][0]).toEqual({
				fromBlock: 0,
				toBlock: 'latest',
			})
		})

		it('Throw an error when that occurred an error on passed contract', async () => {
			const res = await watchEvent({
				contract: mock(new Error('Test'), ({} as unknown) as Event),
				resolver: async () => true,
			}).catch((err: Error) => err)
			expect((res as Error).message).toBe('Test')
			expect(res).toBeInstanceOf(Error)
		})
	})
})
