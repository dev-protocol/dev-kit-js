import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type transferHistoryLengthOfSenderCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string, sender: string) => Promise<string>

export const transferHistoryLengthOfSenderCaller: transferHistoryLengthOfSenderCaller =

		(contract: ethers.Contract) =>
		async (propertyAddress: string, sender: string) =>
			execute<QueryOption>({
				contract,
				method: 'transferHistoryLengthOfSender',
				args: [propertyAddress, sender],
				mutation: false,
			})
