/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateOwnerOfCaller = (
	contract: ethers.Contract
) => (tokenId: number) => Promise<string>

export const createOwnerOfCaller: CreateOwnerOfCaller =
	(contract: ethers.Contract) => async (tokenId: number) =>
		execute<QueryOption, string>({
			contract,
			method: 'ownerOf',
			args: [String(tokenId)],
			mutation: false,
		})
