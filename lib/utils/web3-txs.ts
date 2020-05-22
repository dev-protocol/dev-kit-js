export type Event = {
	readonly address: string
	readonly blockHash: string
	readonly blockNumber: number
	readonly event: string
	readonly logIndex: number
	readonly raw: {
		readonly data: string
		readonly topics: string
	}
	readonly returnValues: {
		readonly [key: string]: string | number
	}
	readonly signature: string
	readonly transactionHash: string
	readonly transactionIndex: number
}
export type ReceiptEvent = {
	readonly [key: string]: Event
}
export type TxReceipt = {
	readonly blockHash: string
	readonly blockNumber: number
	readonly contractAddress: string | null
	readonly cumulativeGasUsed: number
	readonly events: ReceiptEvent
	readonly from: string
	readonly gasUsed: number
	readonly logsBloom: string
	readonly status: boolean
	readonly to: string
	readonly transactionHash: string
	readonly transactionIndex: number
}
export type SendTx = Promise<TxReceipt> & {
	readonly on: <T extends 'transactionHash' | 'confirmation' | 'error'>(
		type: T,
		callback: T extends 'transactionHash' // eslint-disable-next-line functional/no-return-void
			? (hash: string) => void
			: T extends 'confirmation' // eslint-disable-next-line functional/no-return-void
			? (confirmationNumber: number, receipt: TxReceipt) => void // eslint-disable-next-line functional/no-return-void
			: (err: Readonly<Error>) => void
	) => SendTx
}
