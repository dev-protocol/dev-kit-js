import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type transferHistoryLengthOfRecipientCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string, recipient: string) => Promise<string>

export const transferHistoryLengthOfRecipientCaller: transferHistoryLengthOfRecipientCaller =

		(contract: ethers.Contract) =>
		async (propertyAddress: string, recipient: string) =>
			execute<QueryOption>({
				contract,
				method: 'transferHistoryLengthOfRecipient',
				args: [propertyAddress, recipient],
				mutation: false,
			})
