import Web3 from 'web3'
import { createLockupContract, LockupContract } from '.'
import { createGetValueCaller } from './getValue'
import { lockupAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetPropertyValueCaller } from './getPropertyValue'
import { createCancelCaller } from './cancel'
import { createWithdrawCaller } from './withdraw'
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'

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
				const lockupContract = new client.eth.Contract(
					[...lockupAbi],
					address,
					{
						...options,
					}
				)
				return {
					getValue: createGetValueCaller(lockupContract),
					getAllValue: createGetAllValueCaller(lockupContract),
					getPropertyValue: createGetPropertyValueCaller(lockupContract),
					cancel: createCancelCaller(lockupContract, client),
					withdraw: createWithdrawCaller(lockupContract, client),
					calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(
						lockupContract
					),
					calculateCumulativeHoldersRewardAmount: createCalculateCumulativeHoldersRewardAmountCaller(
						lockupContract
					),
					getStorageWithdrawalStatus: createGetStorageWithdrawalStatusCaller(
						lockupContract
					),
				}
			}

			const result = createLockupContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
