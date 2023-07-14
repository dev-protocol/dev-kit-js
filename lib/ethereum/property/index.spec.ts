import { ethers } from 'ethers'
import { createPropertyContract, PropertyContract } from '.'
import { propertyAbi } from './abi'
import { createAuthorCaller } from './author'
import { createChangeNameCaller } from './changeName'
import { createChangeSymbolCaller } from './changeSymbol'
import { createChangeAuthorCaller } from './changeAuthor'
import { createTransferCaller } from './../../common/erc20/transfer'
import { createNameCaller } from './../../common/erc20/name'
import { createSymbolCaller } from './../../common/erc20/symbol'
import { createTotalSupplyCaller } from './../../common/erc20/totalSupply'
import { createDecimalsCaller } from './../../common/erc20/decimals'
import { createTransferFromCaller } from '../../common/erc20/transferFrom'
import { createBalanceOfCaller } from './../../common/erc20/balanceOf'
import { createApproveCaller } from './../../common/erc20/approve'
import { createAllowanceCaller } from './../../common/erc20/allowance'

jest.mock('./author')
jest.mock('./changeName')
jest.mock('./changeSymbol')
jest.mock('./changeAuthor')
jest.mock('./../../common/erc20/transfer')
jest.mock('./../../common/erc20/name')
jest.mock('./../../common/erc20/symbol')
jest.mock('./../../common/erc20/totalSupply')
jest.mock('./../../common/erc20/decimals')
jest.mock('./../../common/erc20/transferFrom')
jest.mock('./../../common/erc20/balanceOf')
jest.mock('./../../common/erc20/approve')
jest.mock('./../../common/erc20/allowance')
jest.mock('ethers')

describe('property/index.ts', () => {
	;(createAuthorCaller as jest.Mock).mockImplementation(() => 123)
	;(createChangeNameCaller as jest.Mock).mockImplementation(() => 123)
	;(createChangeSymbolCaller as jest.Mock).mockImplementation(() => 123)
	;(createChangeAuthorCaller as jest.Mock).mockImplementation(() => 123)
	;(createTransferCaller as jest.Mock).mockImplementation(() => 123)
	;(createNameCaller as jest.Mock).mockImplementation(() => 123)
	;(createSymbolCaller as jest.Mock).mockImplementation(() => 123)
	;(createTotalSupplyCaller as jest.Mock).mockImplementation(() => 123)
	;(createDecimalsCaller as jest.Mock).mockImplementation(() => 123)
	;(createTransferFromCaller as jest.Mock).mockImplementation(() => 123)
	;(createBalanceOfCaller as jest.Mock).mockImplementation(() => 123)
	;(createApproveCaller as jest.Mock).mockImplementation(() => 123)
	;(createAllowanceCaller as jest.Mock).mockImplementation(() => 123)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => PropertyContract = (
				address: string,
			) => {
				const contract = new ethers.Contract(
					address,
					[...propertyAbi],
					provider,
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
				JSON.stringify(expected(address)),
			)
		})
	})
})
