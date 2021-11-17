import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { sTokensAbi } from './abi'
import { createPositionsCaller, Positions } from './positions'
import { createOwnerOfCaller } from './ownerOf'
import { createRewardsCaller, Rewards } from './rewards'
import { createTokenURICaller, TokenURI } from './tokenURI'
import { createPositionsOfPropertyCaller } from './positionsOfProperty'
import { createPositionsOfOwnerCaller } from './positionsOfOwner'

export type STokensContract = {
	readonly positions: (tokenId: number) => Promise<Positions>
	readonly ownerOf: (tokenId: number) => Promise<string>
	readonly rewards: (tokenId: number) => Promise<Rewards>
	readonly tokenURI: (tokenId: number) => Promise<TokenURI>
	readonly positionsOfProperty: (
		propertyAddress: string
	) => Promise<readonly number[]>
	readonly positionsOfOwner: (
		accountAddress: string
	) => Promise<readonly number[]>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createSTokensContract =
	(provider: Provider | Signer) =>
	(address: string): STokensContract => {
		const contractClient: ethers.Contract = new ethers.Contract(
			address,
			[...sTokensAbi],
			provider
		)

		return {
			positions: createPositionsCaller(contractClient),
			ownerOf: createOwnerOfCaller(contractClient),
			rewards: createRewardsCaller(contractClient),
			tokenURI: createTokenURICaller(contractClient),
			positionsOfProperty: createPositionsOfPropertyCaller(contractClient),
			positionsOfOwner: createPositionsOfOwnerCaller(contractClient),
		}
	}
