import Web3 from 'web3'
import { createPropertyContract, PropertyContract } from '.'
import { createAuthorCaller } from './author'
import { createTransferCaller } from './../erc20/transfer'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createNameCaller } from './../erc20/name'
import { createSymbolCaller } from './../erc20/symbol'
import { createTotalSupplyCaller } from './../erc20/totalSupply'
import { createDecimalsCaller } from './../erc20/decimals'
import { createTransferFromCaller } from '../erc20/transferFrom'
import { createBalanceOfCaller } from './../erc20/balanceOf'
import { createApproveCaller } from './../erc20/approve'
import { createAllowanceCaller } from './../erc20/allowance'

describe('property/index.ts', () => {
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => PropertyContract = (address?: string, options?: CustomOptions) => {
				const propertyContract = new client.eth.Contract(
					[...propertyAbi],
					address,
					{
						...options,
					}
				)
				return {
					author: createAuthorCaller(propertyContract),
					balanceOf: createBalanceOfCaller(propertyContract),
					approve: createApproveCaller(propertyContract, client),
					transfer: createTransferCaller(propertyContract, client),
					transferFrom: createTransferFromCaller(propertyContract, client),
					name: createNameCaller(propertyContract),
					symbol: createSymbolCaller(propertyContract),
					totalSupply: createTotalSupplyCaller(propertyContract),
					decimals: createDecimalsCaller(propertyContract),
					allowance: createAllowanceCaller(propertyContract),
					contract: () => propertyContract,
				}
			}

			const result = createPropertyContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
