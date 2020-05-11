import Web3 from 'web3'
import { SendTx } from './web3-txs'

export const stubbedWeb3 = ({
	eth: {
		async getAccounts(): Promise<string[]> {
			return Promise.resolve(['0x'])
		},
	},
} as unknown) as Web3

export const stubbedSendTx = (
	confirmationEvent: {
		readonly name: string
		readonly property: string
		readonly value: string
	} = {
		name: 'Test',
		property: '_test',
		value: 'test',
	},
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
							events: {
								[confirmationEvent.name]: {
									event: confirmationEvent.name,
									returnValues: {
										[confirmationEvent.property]: confirmationEvent.value,
									},
								},
							},
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
