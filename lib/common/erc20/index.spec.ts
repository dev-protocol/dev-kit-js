import { ethers } from 'ethers'
import { createErc20Contract, Erc20Contract } from '.'
import { createTransferCaller } from './transfer'
import { erc20Abi } from './abi'
import { createBalanceOfCaller } from './balanceOf'
import { createTotalSupplyCaller } from './totalSupply'
import { createApproveCaller } from './approve'
import { createTransferFromCaller } from './transferFrom'
import { createNameCaller } from './name'
import { createSymbolCaller } from './symbol'
import { createDecimalsCaller } from './decimals'
import { createAllowanceCaller } from './allowance'

jest.mock('./balanceOf')
jest.mock('./totalSupply')
jest.mock('./approve')
jest.mock('./transferFrom')
jest.mock('./name')
jest.mock('./symbol')
jest.mock('./decimals')
jest.mock('./allowance')
jest.mock('ethers')

describe('erc20/index.ts', () => {
	;(createBalanceOfCaller as jest.Mock).mockImplementation(() => 123)
	;(createTotalSupplyCaller as jest.Mock).mockImplementation(() => 123)
	;(createApproveCaller as jest.Mock).mockImplementation(() => 123)
	;(createTransferFromCaller as jest.Mock).mockImplementation(() => 123)
	;(createNameCaller as jest.Mock).mockImplementation(() => 123)
	;(createSymbolCaller as jest.Mock).mockImplementation(() => 123)
	;(createDecimalsCaller as jest.Mock).mockImplementation(() => 123)
	;(createAllowanceCaller as jest.Mock).mockImplementation(() => 123)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)

	describe('createErc20Contract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)
			const expected: (address: string) => Erc20Contract = (
				address: string,
			) => {
				const contract = new ethers.Contract(address, [...erc20Abi], provider)
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
				}
			}

			const result = createErc20Contract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address)),
			)
		})
	})
})
