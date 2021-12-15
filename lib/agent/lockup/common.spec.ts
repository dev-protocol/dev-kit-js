import { ethers } from 'ethers'
import { createLockupContract, LockupContract } from '../../ethereum/lockup'
import { createGetValueCaller } from '../../ethereum/lockup/getValue'
import { lockupAbi } from '../../ethereum/lockup/abi'
import { createGetPropertyValueCaller } from '../../ethereum/lockup/getPropertyValue'
import { createWithdrawCaller } from '../../ethereum/lockup/withdraw'
import { createCalculateWithdrawableInterestAmountCaller } from '../../ethereum/lockup/calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from '../../ethereum/lockup/getAllValue'
import { createGetStorageWithdrawalStatusCaller } from '../../ethereum/lockup/getStorageWithdrawalStatus'
import { createCalculateCumulativeHoldersRewardAmountCaller } from '../../ethereum/lockup/calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from '../../ethereum/lockup/calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from '../../ethereum/lockup/calculateRewardAmount'
import { createCapCaller } from '../../ethereum/lockup/cap'
import { createDepositToPropertyCaller } from '../../ethereum/lockup/depositToProperty'
import { createDepositToPositionCaller } from '../../ethereum/lockup/depositToPosition'
import { createWithdrawByPositionCaller } from '../../ethereum/lockup/withdrawByPosition'
import { createMigrateToSTokensCaller } from '../../ethereum/lockup/migrateToSTokens'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from '../../ethereum/lockup/calculateWithdrawableInterestAmountByPosition'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'
import { Options, positionsCreate } from './positionsCreate'
import { getLockupAddress, getLockupContract } from './common'
import { addresses } from '../../addresses'
import { createDevkitContract } from '../../ethereum/contract'

describe('common.ts', () => {
	const host = 'localhost'
	const address = '0x0000000000000000000000000000000000000000'
	const provider = new ethers.providers.JsonRpcProvider(host)

	const homestead = ethers.getDefaultProvider('homestead')
	const ropsten = ethers.getDefaultProvider('ropsten')

	const arbitrumOneLockup = addresses.arbitrum.one.lockup
	const arbitrumRinkebyLockup = addresses.arbitrum.rinkeby.lockup

	describe('getLockupAddress', () => {
		it('chainId is 1', async () => {
			const result = await getLockupAddress(1, homestead)
			const expected = await createDevkitContract(homestead)
				.registry(addresses.eth['main'].registry)
				['lockup']()

			expect(result).toEqual(expected)
		})
		it('chainId is 3', async () => {
			const result = await getLockupAddress(3, ropsten)
			const expected = await createDevkitContract(ropsten)
				.registry(addresses.eth['ropsten'].registry)
				['lockup']()

			expect(result).toEqual(expected)
		})
		it('chainId is 42161', async () => {
			const result = await getLockupAddress(42161, provider)
			expect(result).toEqual(arbitrumOneLockup)
		})
		it('chainId is 421611', async () => {
			const result = await getLockupAddress(421611, provider)
			expect(result).toEqual(arbitrumRinkebyLockup)
		})
	})

	describe('getCreateLockupContract', () => {
		// it("provider is homestead", async () => {
		//     const expectedLockup = await createLockupContract(homestead)
		// 	const lockupAddress = await createDevkitContract(homestead)
		// 		.registry(addresses.eth['main'].registry)
		// 		['lockup']()
		// 	const expected = await expectedLockup(lockupAddress)
		// 	const result = await getLockupContract(homestead)
		// 	expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		// })
		it('provider is ropsten', async () => {
			const expectedLockup = await createLockupContract(ropsten)
			const lockupAddress = await createDevkitContract(ropsten)
				.registry(addresses.eth['ropsten'].registry)
				['lockup']()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(ropsten)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		// it('provider is arbitrum one', async () => {
		// const provider =
		// const expectedLockup = await createLockupContract()
		// const expected = await expectedLockup(arbitrumOneLockup)
		// const result = await getLockupContract()
		// expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		// })
		// it('provider is arbitrum rinkeby', async () => {
		// 	const provider =
		//     const expectedLockup = await createLockupContract()
		// 	const expected = await expectedLockup(arbitrumOneLockup)
		// 	const result = await getLockupContract()
		// 	expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		// })
	})
})
