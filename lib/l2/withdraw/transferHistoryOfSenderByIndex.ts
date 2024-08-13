import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type transferHistoryOfSenderByIndexCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	sender: string,
	index: number | string,
) => Promise<string>

export const transferHistoryOfSenderByIndexCaller: transferHistoryOfSenderByIndexCaller =

		(contract: ethers.Contract) =>
		async (propertyAddress: string, sender: string, index: number | string) =>
			execute<QueryOption>({
				contract,
				method: 'transferHistoryOfSenderByIndex',
				args: [propertyAddress, sender, String(index)],
				mutation: false,
			})
