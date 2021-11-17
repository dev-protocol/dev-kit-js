/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { arrayify } from '../../common/utils/arrayify'

export type PositionsOwner = {
	readonly address: string
}

export type CreateOwnerOfCaller = (
	contract: ethers.Contract
) => (tokenId: number) => Promise<PositionsOwner>

export const createOwnerOfCaller: CreateOwnerOfCaller =
	(contract: ethers.Contract) => async (tokenId: number) => {
		const res = await execute<
			QueryOption,
			{
				readonly address: string
			}
		>({
			contract,
			method: 'ownerOf',
			args: [String(tokenId)],
			mutation: false,
		})
		const arrayified = arrayify(res)
		return {
			address: arrayified[0],
		}
	}

