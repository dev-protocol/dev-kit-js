import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { sTokensAbi } from './abi'
import { createPositionsCaller, Positions } from './positions'
import { createIsFreezedCaller } from './isFreezed'
import { createFreezeTokenURICaller } from './freezeTokenURI'
import { createSetTokenURIImageCaller } from './setTokenURIImage'
import { createOwnerOfCaller } from './ownerOf'
import { createRewardsCaller, Rewards } from './rewards'
import { createTokenURICaller, TokenURI } from './tokenURI'
import { createPositionsOfPropertyCaller } from './positionsOfProperty'
import { createPositionsOfOwnerCaller } from './positionsOfOwner'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { always } from 'ramda'

export type STokensContract = {
	readonly positions: (tokenId: number) => Promise<Positions>
	readonly isFreezed: (tokenId: number) => Promise<boolean>
	readonly freezeTokenURI: (tokenId: number) => Promise<TransactionResponse>
	readonly setTokenURIImage: (
		tokenId: number,
		data: string
	) => Promise<TransactionResponse>
	readonly ownerOf: (tokenId: number) => Promise<string>
	readonly rewards: (tokenId: number) => Promise<Rewards>
	readonly tokenURI: (tokenId: number) => Promise<TokenURI>
	readonly positionsOfProperty: (
		propertyAddress: string
	) => Promise<readonly number[]>
	readonly positionsOfOwner: (
		accountAddress: string
	) => Promise<readonly number[]>
	readonly contract: () => ethers.Contract
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
			isFreezed: createIsFreezedCaller(contractClient),
			freezeTokenURI: createFreezeTokenURICaller(contractClient),
			setTokenURIImage: createSetTokenURIImageCaller(contractClient),
			ownerOf: createOwnerOfCaller(contractClient),
			rewards: createRewardsCaller(contractClient),
			tokenURI: createTokenURICaller(contractClient),
			positionsOfProperty: createPositionsOfPropertyCaller(contractClient),
			positionsOfOwner: createPositionsOfOwnerCaller(contractClient),
			contract: always(contractClient),
		}
	}
