/* eslint-disable functional/no-return-void */
import { Contract } from 'web3-eth-contract/types'
import { Event } from './web3-txs'
import { always } from 'ramda'

export type WatchEventOptions = {
	readonly contract: Contract
	// eslint-disable-next-line functional/no-mixed-type
	readonly resolver: (resolve: () => void, e: Event) => void
}

export const watchEvent = async ({
	contract,
	resolver,
}: WatchEventOptions): Promise<Event> =>
	new Promise((resolve, reject) => {
		const { events } = contract
		// eslint-disable-next-line functional/no-expression-statement
		events.allEvents(
			{ fromBlock: 0, toBlock: 'latest' },
			(err: Readonly<Error> | null, e: Event) =>
				err ? reject(err) : resolver(always(resolve(e)), e)
		)
	})
