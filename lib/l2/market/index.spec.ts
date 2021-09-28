import Web3 from 'web3'
import { createMarketContract, CreateMarketContract } from '.'
import { createSchemaCaller } from './schema'
import { createVoteCaller } from './vote'
import { CustomOptions } from '../../common/option'
import { marketAbi } from './abi'
import { createAuthenticateCaller } from './authenticate'
import { createBehaviorCaller } from './behavior'

describe('market.ts', () => {
	describe('createMarketContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => CreateMarketContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const marketContract = new client.eth.Contract(
					[...marketAbi],
					address,
					{
						...options,
					}
				)
				return {
					behavior: createBehaviorCaller(marketContract),
					schema: createSchemaCaller(marketContract),
					vote: createVoteCaller(marketContract, client),
					authenticate: createAuthenticateCaller(marketContract, client),
					contract: () => marketContract,
				}
			}

			const result = createMarketContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
