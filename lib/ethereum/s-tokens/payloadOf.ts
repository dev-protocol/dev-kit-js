/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreatePayloadOfCaller = (
	contract: ethers.Contract
) => (
	tokenId: number
) => Promise<string>

export const createpayloadOfCaller: CreatePayloadOfCaller =
	(contract: ethers.Contract) =>
	async (tokenId: number): Promise<string> =>{
		const res = execute<QueryOption>({
			contract,
			method: 'payloadOf',
			args: [String(tokenId)],
			mutation: false
		})
		return res
	}
