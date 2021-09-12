import Web3 from 'web3'
import { CustomOptions } from '../option'
import { createSTokensContract, CreateSTokensContract } from '.'
import { createPositionsCaller } from './positions'
import { createRewardsCaller } from './rewards'
import { createTokenURICaller } from './tokenURI'
import { sTokensAbi } from './abi'
import { createPositionsOfPropertyCaller } from './positionsOfProperty'
import { createPositionsOfOwnerCaller } from './positionsOfOwner'

describe('s-tokens/index.ts', () => {
	describe('createSTokensContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => CreateSTokensContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const sTokensContract = new client.eth.Contract(
					[...sTokensAbi],
					address,
					{
						...options,
					}
				)
				return {
					positions: createPositionsCaller(sTokensContract),
					rewards: createRewardsCaller(sTokensContract),
					tokenURI: createTokenURICaller(sTokensContract),
					positionsOfProperty: createPositionsOfPropertyCaller(sTokensContract),
					positionsOfOwner: createPositionsOfOwnerCaller(sTokensContract),
					contract: () => sTokensContract,
				}
			}

			const result = createSTokensContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
