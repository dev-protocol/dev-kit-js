import { ethers } from 'ethers'
import { createDevContract, DevContract } from '.'
import { devAbi } from './abi'
import { createTransferCaller } from './transfer'
import { createDepositCaller } from './deposit'
import { createBalanceOfCaller } from './../erc20/balanceOf'
import { createTotalSupplyCaller } from './../erc20/totalSupply'

jest.mock('./transfer')
jest.mock('./deposit')
jest.mock('./balanceOf')
jest.mock('./totalSupply')

describe('property/index.ts', () => {
	describe('createDevContract', () => {
		;(createTransferCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		;(createDepositCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		;(createBalanceOfCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		;(createTotalSupplyCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'

			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => DevContract = (address: string) => {
				const contract = new ethers.Contract(address, [...devAbi], provider)
				return {
					totalSupply: createTotalSupplyCaller(contract),
					balanceOf: createBalanceOfCaller(contract),
					transfer: createTransferCaller(contract),
					deposit: createDepositCaller(contract),
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
