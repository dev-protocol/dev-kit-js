/* eslint-disable functional/no-return-void */
import { Contract } from 'web3-eth-contract/types'
import { Event } from './web3-txs'

export type WatchEventOptions = {
	readonly contract: Contract
	// eslint-disable-next-line functional/no-mixed-type
	readonly resolver: (e: Event) => Promise<boolean>
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
				err
					? reject(err)
					: resolver(e).then((res) => (res ? resolve(e) : undefined))
		)
	})
