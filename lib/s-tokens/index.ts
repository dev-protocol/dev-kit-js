import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { sTokensAbi } from './abi'
import { CustomOptions } from '../option'
import { createPositionsCaller, Positions } from './positions'
import { createRewardsCaller, Rewards } from './rewards'
import { always } from 'ramda'
import { createTokenURICaller, TokenURI } from './tokenURI'

export type CreateSTokensContract = {
	readonly positions: (tokenId: number) => Promise<Positions>
	readonly rewards: (tokenId: number) => Promise<Rewards>
	readonly tokenURI: (tokenId: number) => Promise<TokenURI>
	readonly contract: () => Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createSTokensContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): CreateSTokensContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...sTokensAbi],
			address,
			{
				...options,
			}
		)

		return {
			positions: createPositionsCaller(contractClient),
			rewards: createRewardsCaller(contractClient),
			tokenURI: createTokenURICaller(contractClient),
			contract: always(contractClient),
		}
	}
