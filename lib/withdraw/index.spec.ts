import { ethers } from 'ethers'
import { createWithdrawContract, WithdrawContract } from '.'
import { withdrawAbi } from './abi'
import { createWithdrawCaller } from './withdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'

jest.mock('./withdraw')
jest.mock('./getRewardsAmount')
jest.mock('./calculateWithdrawableAmount')

describe('lockup/index.ts', () => {
	describe('createLockupContract', () => {
		;(createWithdrawCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		;(createGetRewardsAmountCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		;(createCalculateWithdrawableAmountCaller as jest.Mock).mockImplementation(
			(contract) => contract
		)
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'

			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => WithdrawContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...withdrawAbi],
					provider
				)
				return {
					withdraw: createWithdrawCaller(contract),
					getRewardsAmount: createGetRewardsAmountCaller(contract),
					calculateWithdrawableAmount: createCalculateWithdrawableAmountCaller(
						contract
					),
				}
			}

			const result = createWithdrawContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
