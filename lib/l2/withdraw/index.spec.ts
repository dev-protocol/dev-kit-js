import { ethers } from 'ethers'
import { createWithdrawContract, WithdrawContract } from '.'
import { withdrawAbi } from './abi'
import { createWithdrawCaller } from '../../ethereum/withdraw/withdraw'
import { calculateRewardAmountCaller } from './calculateRewardAmount'
import { transferHistoryCaller } from './transferHistory'
import { transferHistoryLengthCaller } from './transferHistoryLength'
import { transferHistoryLengthOfRecipientCaller } from './transferHistoryLengthOfRecipient'
import { transferHistoryLengthOfSenderCaller } from './transferHistoryLengthOfSender'
import { transferHistoryOfRecipientByIndexCaller } from './transferHistoryOfRecipientByIndex'
import { transferHistoryOfSenderByIndexCaller } from './transferHistoryOfSenderByIndex'

jest.mock('./withdraw')
jest.mock('./transferHistory')
jest.mock('./transferHistoryLength')
jest.mock('./transferHistoryLengthOfRecipient')
jest.mock('./transferHistoryLengthOfSender')
jest.mock('./transferHistoryOfRecipientByIndex')
jest.mock('./transferHistoryOfSenderByIndex')
jest.mock('ethers')

describe('withdraw/index.ts', () => {
	;(createWithdrawCaller as jest.Mock).mockImplementation(() => 123)
	;(calculateRewardAmountCaller as jest.Mock).mockImplementation(() => 123)
	;(transferHistoryCaller as jest.Mock).mockImplementation(() => 123)
	;(transferHistoryLengthCaller as jest.Mock).mockImplementation(() => 123)
	;(transferHistoryLengthOfRecipientCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(transferHistoryLengthOfSenderCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(transferHistoryOfRecipientByIndexCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(transferHistoryOfSenderByIndexCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(ethers.Contract as jest.Mock).mockImplementation(() => 123)
	describe('createWithdrawContract', () => {
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
					calculateRewardAmount: calculateRewardAmountCaller(contract),
					transferHistory: transferHistoryCaller(contract),
					transferHistoryLength: transferHistoryLengthCaller(contract),
					transferHistoryLengthOfRecipient:
						transferHistoryLengthOfRecipientCaller(contract),
					transferHistoryLengthOfSender:
						transferHistoryLengthOfSenderCaller(contract),
					transferHistoryOfRecipientByIndex:
						transferHistoryOfRecipientByIndexCaller(contract),
					transferHistoryOfSenderByIndex:
						transferHistoryOfSenderByIndexCaller(contract),
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
