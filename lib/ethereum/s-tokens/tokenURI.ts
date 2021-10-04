/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { decode } from 'js-base64'
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type TokenURI = {
	readonly name: string
	readonly description: string
	readonly image: string
}

export type CreateTokenURICaller = (
	contract: Contract
) => (tokenId: number) => Promise<TokenURI>

export const createTokenURICaller: CreateTokenURICaller =
	(contract: Contract) => async (tokenId: number) => {
		const res = await execute({
			contract,
			method: 'tokenURI',
			args: [String(tokenId)],
		})
		const decoded = decode(
			res.replace(/^data:application\/json;base64,(.*)/, '$1')
		)
		return JSON.parse(decoded)
	}
