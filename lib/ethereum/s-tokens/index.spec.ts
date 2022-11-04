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

describe('s-tokens/index.ts', () => {
	;(createPositionsCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createOwnerOfCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createRewardsCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createTokenURICaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPositionsOfPropertyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPositionsOfOwnerCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createIsFreezedCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createFreezeTokenURICaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createSetTokenURIImageCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createSetSTokenRoyaltyForPropertyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTokenURISimCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createSTokensContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => STokensContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...sTokensAbi], provider)
				return {
					positions: createPositionsCaller(contract),
					isFreezed: createIsFreezedCaller(contract),
					freezeTokenURI: createFreezeTokenURICaller(contract),
					setTokenURIImage: createSetTokenURIImageCaller(contract),
					setSTokenRoyaltyForProperty: createSetSTokenRoyaltyForPropertyCaller(contract),
					ownerOf: createOwnerOfCaller(contract),
					rewards: createRewardsCaller(contract),
					tokenURI: createTokenURICaller(contract),
					tokenURISim: createTokenURISimCaller(contract),
					positionsOfProperty: createPositionsOfPropertyCaller(contract),
					positionsOfOwner: createPositionsOfOwnerCaller(contract),
					contract: () => contract,
				}
			}

			const result = createSTokensContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
