import { Contract } from 'web3-eth-contract/types'
import { watchEvent } from './watchEvent'
import { Event } from './txPromisify'

const mock = (err: Readonly<Error> | null, event: Event) =>
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
				event: 'test',
				handler: (e) => e.returnValues.MyParam,
			})
			expect(res).toBe(1)
		})

		it('Throw an error when that occurred an error on passed contract', async () => {
			const res = await watchEvent({
				contract: mock(new Error('Test'), ({} as unknown) as Event),
				event: 'test',
				handler: (e) => e,
			}).catch((err: Error) => err)
			expect((res as Error).message).toBe('Test')
			expect(res).toBeInstanceOf(Error)
		})
	})
})
