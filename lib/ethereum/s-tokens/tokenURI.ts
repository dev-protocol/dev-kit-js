/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { decode } from 'js-base64'
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type TokenURI = {
	readonly name: string
	readonly description: string
	readonly image: string
}

export type CreateTokenURICaller = (
	contract: ethers.Contract
) => (tokenId: number) => Promise<TokenURI>

export const createTokenURICaller: CreateTokenURICaller =
	(contract: ethers.Contract) => async (tokenId: number) => {
		const res = await execute<QueryOption>({
			contract,
			method: 'tokenURI',
			args: [String(tokenId)],
			mutation: false,
		})
		const decoded = decode(
			res.replace(/^data:application\/json;base64,(.*)/, '$1')
		)
		return JSON.parse(decoded)
	}
