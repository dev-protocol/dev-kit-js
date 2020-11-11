import Web3 from 'web3'
import { createWithdrawContract, WithdrawContract } from '.'
import { withdrawAbi } from './abi'
import { CustomOptions } from '../option'
import { createWithdrawCaller } from './withdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'

describe('lockup/index.ts', () => {
	describe('createLockupContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => WithdrawContract = (address?: string, options?: CustomOptions) => {
				const withdrawContract = new client.eth.Contract(
					[...withdrawAbi],
					address,
					{
						...options,
					}
				)
				return {
					withdraw: createWithdrawCaller(withdrawContract, client),
					getRewardsAmount: createGetRewardsAmountCaller(withdrawContract),
					calculateWithdrawableAmount: createCalculateWithdrawableAmountCaller(
						withdrawContract
					),
					contract: () => withdrawContract,
				}
			}

			const result = createWithdrawContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
