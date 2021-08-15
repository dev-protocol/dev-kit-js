import { ethers } from 'ethers'
import { createLockupContract, LockupContract } from '.'
import { createGetValueCaller } from './getValue'
import { lockupAbi } from './abi'
import { createGetPropertyValueCaller } from './getPropertyValue'
import { createCancelCaller } from './cancel'
import { createWithdrawCaller } from './withdraw'
import { createWithdrawInterestCaller } from './withdrawInterest'
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus'

jest.mock('./getPropertyValue')
jest.mock('./cancel')
jest.mock('./withdraw')
jest.mock('./withdrawInterest')
jest.mock('./calculateWithdrawableInterestAmount')
jest.mock('./getAllValue')
jest.mock('./getStorageWithdrawalStatus')

describe('lockup/index.ts', () => {
	;(createGetPropertyValueCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createCancelCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createWithdrawCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createWithdrawInterestCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createCalculateWithdrawableInterestAmountCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createGetAllValueCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createGetStorageWithdrawalStatusCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createLockupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'

			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => LockupContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...lockupAbi], provider)
				return {
					getValue: createGetValueCaller(contract),
					getAllValue: createGetAllValueCaller(contract),
					getPropertyValue: createGetPropertyValueCaller(contract),
					cancel: createCancelCaller(contract),
					withdraw: createWithdrawCaller(contract),
					withdrawInterest: createWithdrawInterestCaller(contract),
					calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(
						contract
					),
					getStorageWithdrawalStatus: createGetStorageWithdrawalStatusCaller(
						contract
					),
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
