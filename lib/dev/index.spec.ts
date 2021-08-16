import Web3 from 'web3'
import { createDevContract, DevContract } from '.'
import { createTransferCaller } from './../erc20/transfer'
import { devAbi } from './abi'
import { CustomOptions } from '../option'
import { createDepositCaller } from './deposit'
import { createBalanceOfCaller } from './../erc20/balanceOf'
import { createTotalSupplyCaller } from './../erc20/totalSupply'
import { createApproveCaller } from './../erc20/approve'
import { createTransferFromCaller } from '../erc20/transferFrom'
import { createNameCaller } from './../erc20/name'
import { createSymbolCaller } from './../erc20/symbol'
import { createDecimalsCaller } from './../erc20/decimals'
import { createAllowanceCaller } from './../erc20/allowance'

describe('dev/index.ts', () => {
	describe('createDevContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => DevContract = (address?: string, options?: CustomOptions) => {
				const devContract = new client.eth.Contract([...devAbi], address, {
					...options,
				})
				return {
					totalSupply: createTotalSupplyCaller(devContract),
					balanceOf: createBalanceOfCaller(devContract),
					transfer: createTransferCaller(devContract, client),
					allowance: createAllowanceCaller(devContract),
					approve: createApproveCaller(devContract, client),
					transferFrom: createTransferFromCaller(devContract, client),
					name: createNameCaller(devContract),
					symbol: createSymbolCaller(devContract),
					decimals: createDecimalsCaller(devContract),
					deposit: createDepositCaller(devContract, client),
					contract: () => devContract,
				}
			}

			const result = createDevContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
