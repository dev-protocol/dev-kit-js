import { ethers } from 'ethers'
import { createSTokensContract, STokensContract } from '.'
import { sTokensAbi } from './abi'
import { createPositionsCaller } from './positions'
import { createOwnerOfCaller } from './ownerOf'
import { createRewardsCaller } from './rewards'
import { createTokenURICaller } from './tokenURI'
import { createTokenURISimCaller } from './tokenURISim'
import { createPositionsOfPropertyCaller } from './positionsOfProperty'
import { createPositionsOfOwnerCaller } from './positionsOfOwner'
import { createIsFreezedCaller } from './isFreezed'
import { createFreezeTokenURICaller } from './freezeTokenURI'
import { createSetTokenURIImageCaller } from './setTokenURIImage'
import { createSetSTokenRoyaltyForPropertyCaller } from './setSTokenRoyaltyForProperty'
import { createRoyaltyOfCaller } from './royaltyOf'
import { createSetTokenURIDescriptorCaller } from './setTokenURIDescriptor'
import { createPayloadOfCaller } from './payloadOf'
import { createDescriptorOfCaller } from './descriptorOf'
import { createDescriptorOfPropertyByPayloadCaller } from './descriptorOfPropertyByPayload'

jest.mock('./positions')
jest.mock('./isFreezed')
jest.mock('./freezeTokenURI')
jest.mock('./setTokenURIImage')
jest.mock('./ownerOf')
jest.mock('./rewards')
jest.mock('./tokenURI')
jest.mock('./tokenURISim')
jest.mock('./positionsOfProperty')
jest.mock('./positionsOfOwner')
jest.mock('./setSTokenRoyaltyForProperty')
jest.mock('./royaltyOf')
jest.mock('./setTokenURIDescriptor')
jest.mock('./descriptorOf')
jest.mock('./descriptorOfPropertyByPayload')
jest.mock('ethers')

describe('s-tokens/index.ts', () => {
	;(createPositionsCaller as jest.Mock).mockImplementation(() => 123)
	;(createOwnerOfCaller as jest.Mock).mockImplementation(() => 123)
	;(createRewardsCaller as jest.Mock).mockImplementation(() => 123)
	;(createTokenURICaller as jest.Mock).mockImplementation(() => 123)
	;(createPositionsOfPropertyCaller as jest.Mock).mockImplementation(() => 123)
	;(createPositionsOfOwnerCaller as jest.Mock).mockImplementation(() => 123)
	;(createIsFreezedCaller as jest.Mock).mockImplementation(() => 123)
	;(createFreezeTokenURICaller as jest.Mock).mockImplementation(() => 123)
	;(createSetTokenURIImageCaller as jest.Mock).mockImplementation(() => 123)
	;(createSetSTokenRoyaltyForPropertyCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(createRoyaltyOfCaller as jest.Mock).mockImplementation(() => 123)
	;(createSetTokenURIDescriptorCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(createTokenURISimCaller as jest.Mock).mockImplementation(() => 123)
	;(createDescriptorOfCaller as jest.Mock).mockImplementation(() => 123)
	;(createDescriptorOfPropertyByPayloadCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)

	describe('createSTokensContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => STokensContract = (
				address: string,
			) => {
				const contract = new ethers.Contract(address, [...sTokensAbi], provider)
				return {
					positions: createPositionsCaller(contract),
					isFreezed: createIsFreezedCaller(contract),
					freezeTokenURI: createFreezeTokenURICaller(contract),
					setTokenURIImage: createSetTokenURIImageCaller(contract),
					setSTokenRoyaltyForProperty:
						createSetSTokenRoyaltyForPropertyCaller(contract),
					royaltyOf: createRoyaltyOfCaller(contract),
					setTokenURIDescriptor: createSetTokenURIDescriptorCaller(contract),
					ownerOf: createOwnerOfCaller(contract),
					rewards: createRewardsCaller(contract),
					tokenURI: createTokenURICaller(contract),
					tokenURISim: createTokenURISimCaller(contract),
					positionsOfProperty: createPositionsOfPropertyCaller(contract),
					positionsOfOwner: createPositionsOfOwnerCaller(contract),
					payloadOf: createPayloadOfCaller(contract),
					descriptorOf: createDescriptorOfCaller(contract),
					descriptorOfPropertyByPayload:
						createDescriptorOfPropertyByPayloadCaller(contract),
					contract: () => contract,
				}
			}

			const result = createSTokensContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address)),
			)
		})
	})
})
