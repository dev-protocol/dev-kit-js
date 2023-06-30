import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'

import { simpleCollectionsAbi } from './abi'
import { createSetImagesCaller } from './setImages'

export const createSimpleCollectionsContract =
	(provider: BaseProvider) => (address: string) => {
		const contractClient: ethers.Contract = new ethers.Contract(
			address,
			[...simpleCollectionsAbi],
			provider
		)

		return {
			setImages: createSetImagesCaller(contractClient),
		}
	}

export { Image } from './types'
