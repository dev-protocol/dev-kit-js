import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type transferHistoryOfRecipientByIndexCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	recipient: string,
	index: number | string,
) => Promise<string>

export const transferHistoryOfRecipientByIndexCaller: transferHistoryOfRecipientByIndexCaller =

		(contract: ethers.Contract) =>
		async (
			propertyAddress: string,
			recipient: string,
			index: number | string,
		) =>
			execute<QueryOption>({
				contract,
				method: 'transferHistoryOfRecipientByIndex',
				args: [propertyAddress, recipient, String(index)],
				mutation: false,
			})
