/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { decode } from 'js-base64'
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type TokenURI = {
	readonly name: string
	readonly description: string
	readonly image: string
	readonly attributes: readonly [
		{
			readonly trait_type: 'Destination'
			readonly value: string
		},
		{
			readonly trait_type: 'Locked Amount'
			readonly display_type: 'number'
			readonly value: number
		}
	]
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
		).replace(/\n/g, '\\n')
		return JSON.parse(decoded)
	}
