import { ethers } from 'ethers'
import { createSTokensContract, STokensContract } from '.'
import { sTokensAbi } from './abi'
import { createPositionsCaller } from './positions'
import { createOwnerOfCaller } from './ownerOf'
import { createRewardsCaller } from './rewards'
import { createTokenURICaller } from './tokenURI'
import { createPositionsOfPropertyCaller } from './positionsOfProperty'
import { createPositionsOfOwnerCaller } from './positionsOfOwner'

jest.mock('./positions')
jest.mock('./ownerOf')
jest.mock('./rewards')
jest.mock('./tokenURI')
jest.mock('./positionsOfProperty')
jest.mock('./positionsOfOwner')

describe('s-tokens/index.ts', () => {
	;(createPositionsCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
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
					ownerOf: createOwnerOfCaller(contract),
					rewards: createRewardsCaller(contract),
					tokenURI: createTokenURICaller(contract),
					positionsOfProperty: createPositionsOfPropertyCaller(contract),
					positionsOfOwner: createPositionsOfOwnerCaller(contract),
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
