import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { arrayify } from '../../common/utils'

export type TransferHistory = {
	readonly to: string
	readonly from: string
	readonly amount: string
	readonly preBalanceOfRecipient: string
	readonly preBalanceOfSender: string
	readonly filled: boolean
	readonly blockNumber: string
}

export type transferHistoryCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	index: number | string,
) => Promise<TransferHistory>

export const transferHistoryCaller: transferHistoryCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, index: number | string) => {
		const res = await execute<
			QueryOption,
			{
				readonly to: string
				readonly from: string
				readonly amount: string
				readonly preBalanceOfRecipient: string
				readonly preBalanceOfSender: string
				readonly filled: boolean
				readonly blockNumber: string
			}
		>({
			contract,
			method: 'transferHistory',
			args: [propertyAddress, String(index)],
			mutation: false,
		})
		const [
			to,
			from,
			amount,
			preBalanceOfRecipient,
			preBalanceOfSender,
			filled,
			blockNumber,
		] = arrayify(res) as readonly [
			string,
			string,
			string,
			string,
			string,
			boolean,
			string,
		]
		return {
			to,
			from,
			amount,
			preBalanceOfRecipient,
			preBalanceOfSender,
			filled,
			blockNumber,
		}
	}
