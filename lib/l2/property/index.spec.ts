import { ethers } from 'ethers'
import { createPropertyContract, PropertyContract } from '.'
import { propertyAbi } from './abi'
import { createAuthorCaller } from './../../ethereum/property/author'
import { createChangeNameCaller } from './../../ethereum/property/changeName'
import { createChangeSymbolCaller } from './../../ethereum/property/changeSymbol'
import { createTransferCaller } from './../../common/erc20/transfer'
import { createNameCaller } from './../../common/erc20/name'
import { createSymbolCaller } from './../../common/erc20/symbol'
import { createTotalSupplyCaller } from './../../common/erc20/totalSupply'
import { createDecimalsCaller } from './../../common/erc20/decimals'
import { createTransferFromCaller } from '../../common/erc20/transferFrom'
import { createBalanceOfCaller } from './../../common/erc20/balanceOf'
import { createApproveCaller } from './../../common/erc20/approve'
import { createAllowanceCaller } from './../../common/erc20/allowance'
import { createGetBalancesCaller } from './getBalances'

jest.mock('./../../ethereum/property/author')
jest.mock('./../../ethereum/property/changeName')
jest.mock('./../../ethereum/property/changeSymbol')
jest.mock('./../../common/erc20/transfer')
jest.mock('./../../common/erc20/name')
jest.mock('./../../common/erc20/symbol')
jest.mock('./../../common/erc20/totalSupply')
jest.mock('./../../common/erc20/decimals')
jest.mock('../../common/erc20/transferFrom')
jest.mock('./../../common/erc20/balanceOf')
jest.mock('./../../common/erc20/approve')
jest.mock('./../../common/erc20/allowance')
jest.mock('./getBalances')

describe('property/index.ts', () => {
	;(createAuthorCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createChangeNameCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createChangeSymbolCaller as jest.Mock).mockImplementation(
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
	;(createGetBalancesCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

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
					changeName: createChangeNameCaller(contract),
					changeSymbol: createChangeSymbolCaller(contract),
					getBalances: createGetBalancesCaller(contract),
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
