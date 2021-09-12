import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { sTokensAbi } from './abi'
import { CustomOptions } from '../option'
import { createPositionsCaller, Positions } from './positions'
import { createRewardsCaller, Rewards } from './rewards'
import { always } from 'ramda'
import { createTokenURICaller, TokenURI } from './tokenURI'
import { createPositionsOfPropertyCaller } from './positionsOfProperty'
import { createPositionsOfOwnerCaller } from './positionsOfOwner'

export type STokensContract = {
	readonly positions: (tokenId: number) => Promise<Positions>
	readonly rewards: (tokenId: number) => Promise<Rewards>
	readonly tokenURI: (tokenId: number) => Promise<TokenURI>
	readonly positionsOfProperty: (
		propertyAddress: string
	) => Promise<readonly number[]>
	readonly positionsOfOwner: (
		accountAddress: string
	) => Promise<readonly number[]>
	readonly contract: () => Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createSTokensContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): STokensContract => {
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
			positionsOfProperty: createPositionsOfPropertyCaller(contractClient),
			positionsOfOwner: createPositionsOfOwnerCaller(contractClient),
			contract: always(contractClient),
		}
	}
