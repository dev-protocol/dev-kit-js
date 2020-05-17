import { Contract } from 'web3-eth-contract/types'
import { Event } from './web3-txs'

export interface WatchEventOptions {
	readonly contract: Contract
	readonly resolver: (resolve: () => void, e: Event) => void
}

export const watchEvent = async ({
	contract,
	resolver,
}: WatchEventOptions): Promise<Event> =>
	new Promise((resolve, reject) => {
		const { events } = contract
		events.allEvents(
			{ fromBlock: 0, toBlock: 'latest' },
			(err: Readonly<Error> | null, e: Event) => {
				if (err) {
					reject(err)
				}

				resolver(() => resolve(e), e)
			}
		)
	})
