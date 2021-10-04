import { ethers } from 'ethers'
import { createDevContract, DevContract } from '.'
import { createTransferCaller } from './../erc20/transfer'
import { devAbi } from './abi'
import { createDepositCaller } from './deposit'
import { createBalanceOfCaller } from './../erc20/balanceOf'
import { createTotalSupplyCaller } from './../erc20/totalSupply'
import { createApproveCaller } from './../erc20/approve'
import { createTransferFromCaller } from '../erc20/transferFrom'
import { createNameCaller } from './../erc20/name'
import { createSymbolCaller } from './../erc20/symbol'
import { createDecimalsCaller } from './../erc20/decimals'
import { createAllowanceCaller } from './../erc20/allowance'

jest.mock('./deposit')
jest.mock('./../erc20/balanceOf')
jest.mock('./../erc20/totalSupply')
jest.mock('./../erc20/approve')
jest.mock('../erc20/transferFrom')
jest.mock('./../erc20/name')
jest.mock('./../erc20/symbol')
jest.mock('./../erc20/decimals')
jest.mock('./../erc20/allowance')

describe('dev/index.ts', () => {
	;(createDepositCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createBalanceOfCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTotalSupplyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createApproveCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createTransferFromCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createNameCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createSymbolCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createDecimalsCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createAllowanceCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)

	describe('createDevContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)
			const expected: (address: string) => DevContract = (address: string) => {
				const contract = new ethers.Contract(address, [...devAbi], provider)
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
					deposit: createDepositCaller(contract),
					contract: () => contract,
				}
			}

			const result = createDevContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
