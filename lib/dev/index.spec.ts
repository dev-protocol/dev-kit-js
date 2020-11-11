import Web3 from 'web3'
import { createDevContract, DevContract } from '.'
import { createTransferCaller } from './transfer'
import { devAbi } from './abi'
import { CustomOptions } from '../option'
import { createDepositCaller } from './deposit'
import { createBalanceOfCaller } from './balanceOf'
import { createTotalSupplyCaller } from './totalSupply'

describe('property/index.ts', () => {
	describe('createPropertyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => DevContract = (address?: string, options?: CustomOptions) => {
				const propertyContract = new client.eth.Contract([...devAbi], address, {
					...options,
				})
				return {
					totalSupply: createTotalSupplyCaller(propertyContract),
					balanceOf: createBalanceOfCaller(propertyContract),
					transfer: createTransferCaller(propertyContract, client),
					deposit: createDepositCaller(propertyContract, client),
					contract: () => propertyContract,
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
