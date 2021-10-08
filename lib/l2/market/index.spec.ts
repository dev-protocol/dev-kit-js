import { ethers } from 'ethers'
import { createMarketContract, MarketContract } from '.'
import { createSchemaCaller } from '../../ethereum/market/schema'
import { createVoteCaller } from '../../ethereum/market/vote'
import { createAuthenticateCaller } from '../../ethereum/market/authenticate'
import { createBehaviorCaller } from '../../ethereum/market/behavior'
import { createGetAuthenticatedPropertiesCaller } from './getAuthenticatedProperties'
import { marketAbi } from './abi'

jest.mock('../../ethereum/market/schema')
jest.mock('../../ethereum/market/vote')
jest.mock('../../ethereum/market/authenticate')
jest.mock('../../ethereum/market/behavior')
jest.mock('./getAuthenticatedProperties')

describe('market/index.ts', () => {
	;(createSchemaCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createVoteCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createAuthenticateCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createBehaviorCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createGetAuthenticatedPropertiesCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)

	describe('createMarketContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => MarketContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...marketAbi], provider)
				return {
					vote: createVoteCaller(contract),
					schema: createSchemaCaller(contract),
					authenticate: createAuthenticateCaller(contract, provider),
					behavior: createBehaviorCaller(contract),
					getAuthenticatedProperties:
						createGetAuthenticatedPropertiesCaller(contract),
				}
			}

			const result = createMarketContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
