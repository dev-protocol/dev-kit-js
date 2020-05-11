import { Contract } from 'web3-eth-contract/types'
import { Event } from './web3-txs'

export interface WatchEventOptions<T> {
	readonly contract: Contract
	readonly event: string
	readonly handler: (e: Event) => T
}

export const watchEvent = async <T>({
	contract,
	event,
	handler,
}: WatchEventOptions<T>): Promise<T> =>
	new Promise((resolve, reject) => {
		const { events } = contract
		events.allEvents(
			{ fromBlock: 0, toBlock: 'latest' },
			(err: Readonly<Error> | null, e: Event) => {
				if (err) {
					reject(err)
				}

				if (e.event === event) {
					resolve(handler(e))
				}
			}
		)
	})
