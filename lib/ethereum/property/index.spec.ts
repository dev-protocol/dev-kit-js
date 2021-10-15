import { ethers } from 'ethers'
import { createPropertyContract, PropertyContract } from '.'
import { propertyAbi } from './abi'
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

jest.mock('./author')
jest.mock('./changeName')
jest.mock('./changeSymbol')
jest.mock('./changeAuthor')
jest.mock('./../erc20/transfer')
jest.mock('./../erc20/name')
jest.mock('./../erc20/symbol')
jest.mock('./../erc20/totalSupply')
jest.mock('./../erc20/decimals')
jest.mock('../erc20/transferFrom')
jest.mock('./../erc20/balanceOf')
jest.mock('./../erc20/approve')
jest.mock('./../erc20/allowance')

describe('property/index.ts', () => {
	;(createAuthorCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createChangeNameCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createChangeSymbolCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createChangeAuthorCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTransferCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createNameCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createSymbolCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createTotalSupplyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createDecimalsCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTransferFromCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createBalanceOfCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createApproveCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createAllowanceCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PropertyContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...propertyAbi],
					provider
				)
				return {
					totalSupply: createTotalSupplyCaller(contract),
					balanceOf: createBalanceOfCaller(contract),
					transfer: createTransferCaller(contract),
					allowance: createAllowanceCaller(contract),
					approve: createApproveCaller(contract),
					transferFrom: createTransferFromCaller(contract),
					name: createNameCaller(contract),
					symbol: createSymbolCaller(contract),
					decimals: createDecimalsCaller(contract),
					author: createAuthorCaller(contract),
					changeAuthor: createChangeAuthorCaller(contract),
					changeName: createChangeNameCaller(contract),
					changeSymbol: createChangeSymbolCaller(contract),
					contract: () => contract,
				}
			}

			const result = createPropertyContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})