/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/functional-parameters */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-extend-native */
import Web3 from 'web3'
import { SendTx } from './web3-txs'

export const stubbedWeb3 = ({
	eth: {
		async getAccounts(): Promise<readonly string[]> {
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
): SendTx => {
	const result = {
		status: true,
		events: {
			[confirmationEvent.name]: {
				event: confirmationEvent.name,
				returnValues: {
					[confirmationEvent.property]: confirmationEvent.value,
				},
			},
		},
	}
	;(Promise.prototype as any).on = function (
		event: string,
		cb: (...args: readonly any[]) => void
	) {
		if (event === 'confirmation') {
			setTimeout(() => {
				if (rejectOnConfirmation) {
					cb(0, {
						status: false,
					})
				} else {
					cb(0, result)
				}
			}, 100)
		}

		if (event === 'error' && reject) {
			setTimeout(() => {
				cb(new Error('Transaction error'))
			}, 90)
		}

		return this
	}

	return new Promise((resolve) => resolve(result)) as any
}
