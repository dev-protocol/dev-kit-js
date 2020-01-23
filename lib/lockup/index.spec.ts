import Web3 from 'web3'
import { createLockupContract, LockupContract } from '.'
import { createGetValueCaller } from './getValue'
import { lockupAbi } from './abi'
import { CustomOptions } from '../option'

describe('lockup/index.ts', () => {
	describe('createLockupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => LockupContract = (address?: string, options?: CustomOptions) => {
				const lockupContract = new client.eth.Contract(lockupAbi, address, {
					...options
				})
				return {
					getValue: createGetValueCaller(lockupContract)
				}
			}

			const result = createLockupContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
