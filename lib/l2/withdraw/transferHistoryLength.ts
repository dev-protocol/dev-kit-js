import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type transferHistoryLengthCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string) => Promise<string>

export const transferHistoryLengthCaller: transferHistoryLengthCaller =
	(contract: ethers.Contract) => async (propertyAddress: string) =>
		execute<QueryOption>({
			contract,
			method: 'transferHistoryLength',
			args: [propertyAddress],
			mutation: false,
		})
