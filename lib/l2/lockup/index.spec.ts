import { ethers } from 'ethers'
import { createLockupContract, LockupContract } from '.'
import { createCalculateCumulativeHoldersRewardAmountCaller } from '../../ethereum/lockup/calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from '../../ethereum/lockup/calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from '../../ethereum/lockup/calculateRewardAmount'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from '../../ethereum/lockup/calculateWithdrawableInterestAmountByPosition'
import { createCapCaller } from '../../ethereum/lockup/cap'
import { createDepositToPositionCaller } from '../../ethereum/lockup/depositToPosition'
import { createDepositToPropertyCaller } from '../../ethereum/lockup/depositToProperty'
import { createWithdrawByPositionCaller } from '../../ethereum/lockup/withdrawByPosition'
import { lockupAbi } from './abi'
import { createGetLockedupPropertiesCaller } from './getLockedupProperties'
import { createTotalLockedCaller } from './totalLocked'
import { createTotalLockedForPropertyCaller } from './totalLockedForProperty'

jest.mock('../../ethereum/lockup/calculateCumulativeHoldersRewardAmount')
jest.mock('../../ethereum/lockup/calculateCumulativeRewardPrices')
jest.mock('../../ethereum/lockup/calculateRewardAmount')
jest.mock('../../ethereum/lockup/cap')
jest.mock('../../ethereum/lockup/depositToProperty')
jest.mock('../../ethereum/lockup/depositToPosition')
jest.mock('../../ethereum/lockup/withdrawByPosition')
jest.mock('../../ethereum/lockup/calculateWithdrawableInterestAmountByPosition')
jest.mock('./totalLocked')
jest.mock('./totalLockedForProperty')
jest.mock('./getLockedupProperties')

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
	;(createGetLockedupPropertiesCaller as jest.Mock).mockImplementation(
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
					getLockedupProperties: createGetLockedupPropertiesCaller(contract),
					contract: () => contract,
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
