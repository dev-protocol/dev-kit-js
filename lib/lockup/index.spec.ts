import Web3 from 'web3'
import { createLockupContract, LockupContract } from '.'
import { createGetValueCaller } from './getValue'
import { lockupAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetPropertyValueCaller } from './getPropertyValue'
import { createWithdrawCaller } from './withdraw'
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from './calculateRewardAmount'
import { createCapCaller } from './cap'

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
					calculateCumulativeRewardPrices: createCalculateCumulativeRewardPricesCaller(
						lockupContract
					),
					calculateRewardAmount: createCalculateRewardAmountCaller(
						lockupContract
					),
					cap: createCapCaller(lockupContract),
					contract: () => lockupContract,
				}
			}

			const result = createLockupContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
