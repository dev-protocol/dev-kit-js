import Web3 from 'web3'
import { createErc20Contract, Erc20Contract } from '.'
import { createTransferCaller } from './../erc20/transfer'
import { erc20Abi } from './abi'
import { CustomOptions } from '../../common/option'
import { createBalanceOfCaller } from './balanceOf'
import { createTotalSupplyCaller } from './totalSupply'
import { createApproveCaller } from './approve'
import { createTransferFromCaller } from './transferFrom'
import { createNameCaller } from './name'
import { createSymbolCaller } from './symbol'
import { createDecimalsCaller } from './decimals'
import { createAllowanceCaller } from './allowance'

describe('erc20/index.ts', () => {
	describe('createErc20Contract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => Erc20Contract = (address?: string, options?: CustomOptions) => {
				const devContract = new client.eth.Contract([...erc20Abi], address, {
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
					contract: () => devContract,
				}
			}

			const result = createErc20Contract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
