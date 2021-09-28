import Web3 from 'web3'
import { createPropertyContract, PropertyContract } from '.'
import { propertyAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createAuthorCaller } from './author'
import { createChangeNameCaller } from './changeName'
import { createChangeSymbolCaller } from './changeSymbol'
import { createChangeAuthorCaller } from './changeAuthor'
import { createTransferCaller } from './../erc20/transfer'
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
					totalSupply: createTotalSupplyCaller(propertyContract),
					balanceOf: createBalanceOfCaller(propertyContract),
					transfer: createTransferCaller(propertyContract, client),
					allowance: createAllowanceCaller(propertyContract),
					approve: createApproveCaller(propertyContract, client),
					transferFrom: createTransferFromCaller(propertyContract, client),
					name: createNameCaller(propertyContract),
					symbol: createSymbolCaller(propertyContract),
					decimals: createDecimalsCaller(propertyContract),
					author: createAuthorCaller(propertyContract),
					changeAuthor: createChangeAuthorCaller(propertyContract, client),
					changeName: createChangeNameCaller(propertyContract, client),
					changeSymbol: createChangeSymbolCaller(propertyContract, client),
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
