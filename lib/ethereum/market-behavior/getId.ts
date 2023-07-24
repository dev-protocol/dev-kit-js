import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetIdCaller = (
	contract: ethers.Contract,
) => (metricsAddress: string) => Promise<string>

export const createGetIdCaller: CreateGetIdCaller =
	(contract: ethers.Contract) => (metricsAddress: string) =>
		execute<QueryOption>({
			contract,
			method: 'getId',
			args: [metricsAddress],
			mutation: false,
		})
