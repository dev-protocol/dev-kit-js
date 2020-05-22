import { SendTx, TxReceipt } from './web3-txs'

export const txPromisify = async (tx: SendTx): Promise<TxReceipt> => {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line functional/no-expression-statement
		tx.on('confirmation', (_, receipt) =>
			receipt.status
				? resolve(receipt)
				: reject(new Error('An error occurred in the transaction.'))
		)
			.on('error', (err) => reject(err))
			.catch((err) => reject(err))
	})
}
