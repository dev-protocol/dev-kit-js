import { ethers } from 'ethers'
import { createWithdrawContract, WithdrawContract } from '.'
import { withdrawAbi } from './abi'
import { createWithdrawCaller } from './withdraw'
import { createBulkWithdrawCaller } from './bulkWithdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'
import { calculateRewardAmountCaller } from './calculateRewardAmount'

jest.mock('./withdraw')
jest.mock('./bulkWithdraw')
jest.mock('./getRewardsAmount')
jest.mock('./calculateWithdrawableAmount')
jest.mock('./calculateRewardAmount')
jest.mock('ethers')

describe('lockup/index.ts', () => {
	;(createWithdrawCaller as jest.Mock).mockImplementation(() => 123)
	;(createBulkWithdrawCaller as jest.Mock).mockImplementation(() => 123)
	;(createGetRewardsAmountCaller as jest.Mock).mockImplementation(() => 123)
	;(createCalculateWithdrawableAmountCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(calculateRewardAmountCaller as jest.Mock).mockImplementation(() => 123)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)
	describe('createLockupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => WithdrawContract = (
				address: string,
			) => {
				const contract = new ethers.Contract(
					address,
					[...withdrawAbi],
					provider,
				)
				return {
					withdraw: createWithdrawCaller(contract),
					bulkWithdraw: createBulkWithdrawCaller(contract),
					getRewardsAmount: createGetRewardsAmountCaller(contract),
					calculateWithdrawableAmount:
						createCalculateWithdrawableAmountCaller(contract),
					calculateRewardAmount: calculateRewardAmountCaller(contract),
					contract: () => contract,
				}
			}

			const result = createWithdrawContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address)),
			)
		})
	})
})
