/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/functional-parameters */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-extend-native */
import {
	TransactionResponse,
	TransactionReceipt,
} from '@ethersproject/abstract-provider'
import { BigNumber } from 'ethers'

export type StubTransactionResposeFactory = (p: {
	readonly hash?: string
	readonly confirm?: (message?: string | undefined) => boolean
	readonly confirmations?: number
	readonly wait?: () => Promise<TransactionReceipt>
	readonly from?: string
	readonly nonce?: number
	readonly gasLimit?: BigNumber
	readonly data?: string
	readonly value?: BigNumber
	readonly chainId?: number
}) => TransactionResponse

export const stubTransactionResposeFactory: StubTransactionResposeFactory = ({
	hash = 'hash',
	confirm = (msg = 'message') => true,
	wait = () =>
		Promise.resolve<TransactionReceipt>({
			to: 'to',
			from: 'from',
			contractAddress: 'contractAddress',
			transactionIndex: 10,
			gasUsed: BigNumber.from(10),
			logsBloom: 'logsBloom',
			blockHash: 'blockHash',
			transactionHash: 'transactionHash',
			logs: [],
			blockNumber: 100,
			confirmations: 102,
			cumulativeGasUsed: BigNumber.from(10),
			effectiveGasPrice: BigNumber.from(10),
			byzantium: true,
			type: 10,
		}),
	confirmations = 102,
	from = 'from',
	nonce = 10,
	gasLimit = BigNumber.from(10),
	data = 'data',
	value = BigNumber.from(10),
	chainId = 10,
}) => ({
	hash,
	confirm,
	confirmations,
	wait,
	from,
	nonce,
	gasLimit,
	data,
	value,
	chainId,
})

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
) => {
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
