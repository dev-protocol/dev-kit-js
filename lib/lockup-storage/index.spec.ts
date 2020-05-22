import Web3 from 'web3'
import { createLockupStorageContract, LockupStorageContract } from '.'
import { lockupStorageAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetWithdrawalStatusCaller } from './getWithdrawalStatus'

describe('lockup-storage/index.ts', () => {
	describe('createLockupStorageContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => LockupStorageContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const lockupStorageContract = new client.eth.Contract(
					[...lockupStorageAbi],
					address,
					{
						...options,
					}
				)
				return {
					getWithdrawalStatus: createGetWithdrawalStatusCaller(
						lockupStorageContract
					),
				}
			}

			const result = createLockupStorageContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
