import Web3 from 'web3'
import { createMarketFactoryContract, MarketFactoryContract } from '.'
import { marketFactoryAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createCreateCaller } from './create'

describe('market-factory/index.ts', () => {
	describe('createMarketFactoryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => MarketFactoryContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const marketFactoryContract = new client.eth.Contract(
					[...marketFactoryAbi],
					address,
					{
						...options,
					}
				)
				return {
					create: createCreateCaller(marketFactoryContract, client),
					contract: () => marketFactoryContract,
				}
			}

			const result = createMarketFactoryContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
