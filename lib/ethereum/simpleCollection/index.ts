import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'

import { createQueryCaller } from './queryCaller'
import { simpleCollectionsAbi } from './abi'
import { createSetImagesCaller } from './setImages'
import { createRemoveImageCaller } from './removeImage'

export const createSimpleCollectionsContract =
	(provider: BaseProvider) => (address: string) => {
		const contractClient: ethers.Contract = new ethers.Contract(
			address,
			[...simpleCollectionsAbi],
			provider
		)

		return {
			image: createQueryCaller(contractClient, 'image'),
			name: createQueryCaller(contractClient, 'name'),
			description: createQueryCaller(contractClient, 'description'),
			setImages: createSetImagesCaller(contractClient),
			removeImage: createRemoveImageCaller(contractClient),
		}
	}

export { Image } from './types'
