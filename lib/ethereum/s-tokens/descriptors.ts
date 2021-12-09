/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { arrayify } from '../../common/utils/arrayify'

export type Descriptors = {
	readonly isFreezed: boolean
	readonly freezingUser: string
	readonly descriptor: string
}

export type CreateDescriptorsCaller = (
	contract: ethers.Contract
) => (tokenId: number) => Promise<Descriptors>

export const createDescriptorsCaller: CreateDescriptorsCaller =
	(contract: ethers.Contract) => async (tokenId: number) => {
		const res = await execute<
			QueryOption,
			{
				readonly isFreezed_: string
				readonly freezingUser_: string
				readonly descriptor_: string
			}
		>({
			contract,
			method: 'descriptors',
			args: [String(tokenId)],
			mutation: false,
		})
		const arrayified = arrayify(res)
		return {
			isFreezed: arrayified[0].toLowerCase() === 'true',
			freezingUser: arrayified[1],
			descriptor: arrayified[2],
		}
	}
