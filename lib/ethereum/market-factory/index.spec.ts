import { ethers } from 'ethers'
import { createMarketFactoryContract, MarketFactoryContract } from '.'
import { marketFactoryAbi } from './abi'
import { createCreateCaller } from './create'

jest.mock('./create')

describe('market-factory/index.ts', () => {
	;(createCreateCaller as jest.Mock).mockImplementation((contract) => contract)
	describe('createMarketFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => MarketFactoryContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...marketFactoryAbi],
					provider
				)
				return {
					create: createCreateCaller(contract),
					contract: () => contract,
				}
			}

			const result = createMarketFactoryContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
