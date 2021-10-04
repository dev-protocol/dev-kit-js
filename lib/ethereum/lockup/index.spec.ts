import { ethers } from 'ethers'
import { createLockupContract, LockupContract } from '.'
import { createGetValueCaller } from './getValue'
import { lockupAbi } from './abi'
import { createGetPropertyValueCaller } from './getPropertyValue'
import { createWithdrawCaller } from './withdraw'
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from './calculateRewardAmount'
import { createCapCaller } from './cap'
import { createDepositToPropertyCaller } from './depositToProperty'
import { createDepositToPositionCaller } from './depositToPosition'
import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { createMigrateToSTokensCaller } from './migrateToSTokens'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from './calculateWithdrawableInterestAmountByPosition'

jest.mock('./getPropertyValue')
jest.mock('./withdraw')
jest.mock('./calculateWithdrawableInterestAmount')
jest.mock('./getAllValue')
jest.mock('./getStorageWithdrawalStatus')
jest.mock('./calculateCumulativeHoldersRewardAmount')
jest.mock('./calculateCumulativeRewardPrices')
jest.mock('./calculateRewardAmount')
jest.mock('./cap')
jest.mock('./depositToProperty')
jest.mock('./depositToPosition')
jest.mock('./withdrawByPosition')
jest.mock('./migrateToSTokens')
jest.mock('./calculateWithdrawableInterestAmountByPosition')

describe('lockup/index.ts', () => {
	;(createGetPropertyValueCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createWithdrawCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(
		createCalculateWithdrawableInterestAmountCaller as jest.Mock
	).mockImplementation((contract) => contract)
	;(createGetAllValueCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createGetStorageWithdrawalStatusCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(
		createCalculateCumulativeHoldersRewardAmountCaller as jest.Mock
	).mockImplementation((contract) => contract)
	;(
		createCalculateCumulativeRewardPricesCaller as jest.Mock
	).mockImplementation((contract) => contract)
	;(createCalculateRewardAmountCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createDepositToPropertyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createDepositToPositionCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createWithdrawByPositionCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMigrateToSTokensCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(
		createcalculateWithdrawableInterestAmountByPositionCaller as jest.Mock
	).mockImplementation((contract) => contract)

	describe('createLockupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => LockupContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...lockupAbi], provider)
				return {
					getValue: createGetValueCaller(contract),
					getAllValue: createGetAllValueCaller(contract),
					getPropertyValue: createGetPropertyValueCaller(contract),
					withdrawByPosition: createWithdrawByPositionCaller(contract),
					withdraw: createWithdrawCaller(contract),
					calculateWithdrawableInterestAmountByPosition:
						createcalculateWithdrawableInterestAmountByPositionCaller(contract),
					calculateWithdrawableInterestAmount:
						createCalculateWithdrawableInterestAmountCaller(contract),
					calculateCumulativeHoldersRewardAmount:
						createCalculateCumulativeHoldersRewardAmountCaller(contract),
					getStorageWithdrawalStatus:
						createGetStorageWithdrawalStatusCaller(contract),
					calculateCumulativeRewardPrices:
						createCalculateCumulativeRewardPricesCaller(contract),
					calculateRewardAmount: createCalculateRewardAmountCaller(contract),
					cap: createCapCaller(contract),
					depositToProperty: createDepositToPropertyCaller(contract),
					depositToPosition: createDepositToPositionCaller(contract),
					migrateToSTokens: createMigrateToSTokensCaller(contract),
				}
			}

			const result = createLockupContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
