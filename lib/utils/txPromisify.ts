import { SendTx, TxReceipt } from './web3-txs'

export const txPromisify = async (tx: SendTx): Promise<TxReceipt> => {
	return new Promise((resolve, reject) => {
		tx.on('confirmation', (_, receipt) => {
			if (receipt.status) {
				return resolve(receipt)
			}

			reject(new Error('An error occurred in the transaction.'))
		})
			.on('error', (err) => reject(err))
			.catch((err) => reject(err))
	})
}
