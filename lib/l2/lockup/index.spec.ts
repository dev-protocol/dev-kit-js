import { ethers } from 'ethers'
import { createLockupContract, LockupContract } from '.'
import { lockupAbi } from './abi'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from './calculateRewardAmount'
import { createCapCaller } from './cap'
import { createDepositToPropertyCaller } from './depositToProperty'
import { createDepositToPositionCaller } from './depositToPosition'
import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from './calculateWithdrawableInterestAmountByPosition'
import { createTotalLockedCaller } from './totalLocked'
import { createTotalLockedForPropertyCaller } from './totalLockedForProperty'

jest.mock('./calculateCumulativeHoldersRewardAmount')
jest.mock('./calculateCumulativeRewardPrices')
jest.mock('./calculateRewardAmount')
jest.mock('./cap')
jest.mock('./depositToProperty')
jest.mock('./depositToPosition')
jest.mock('./withdrawByPosition')
jest.mock('./calculateWithdrawableInterestAmountByPosition')
jest.mock('./totalLocked')
jest.mock('./totalLockedForProperty')

describe('lockup/index.ts', () => {
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
	;(
		createcalculateWithdrawableInterestAmountByPositionCaller as jest.Mock
	).mockImplementation((contract) => contract)
	;(createTotalLockedCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTotalLockedForPropertyCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)

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
					withdrawByPosition: createWithdrawByPositionCaller(contract),
					calculateWithdrawableInterestAmountByPosition:
						createcalculateWithdrawableInterestAmountByPositionCaller(contract),
					calculateCumulativeHoldersRewardAmount:
						createCalculateCumulativeHoldersRewardAmountCaller(contract),
					calculateCumulativeRewardPrices:
						createCalculateCumulativeRewardPricesCaller(contract),
					calculateRewardAmount: createCalculateRewardAmountCaller(contract),
					cap: createCapCaller(contract),
					depositToProperty: createDepositToPropertyCaller(contract),
					depositToPosition: createDepositToPositionCaller(contract),
					totalLocked: createTotalLockedCaller(contract),
					totalLockedForProperty: createTotalLockedForPropertyCaller(contract),
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
