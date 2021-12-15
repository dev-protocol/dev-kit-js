import { ethers } from 'ethers'
import { getCreateLockupContract } from './positionsCreate'
import { createLockupContract, LockupContract } from './../ethereum/lockup'
import { createGetValueCaller } from './../ethereum/lockup/getValue'
import { lockupAbi } from './../ethereum/lockup/abi'
import { createGetPropertyValueCaller } from './../ethereum/lockup/getPropertyValue'
import { createWithdrawCaller } from './../ethereum/lockup/withdraw'
import { createCalculateWithdrawableInterestAmountCaller } from './../ethereum/lockup/calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './../ethereum/lockup/getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './../ethereum/lockup/getStorageWithdrawalStatus'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './../ethereum/lockup/calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from './../ethereum/lockup/calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from './../ethereum/lockup/calculateRewardAmount'
import { createCapCaller } from './../ethereum/lockup/cap'
import { createDepositToPropertyCaller } from './../ethereum/lockup/depositToProperty'
import { createDepositToPositionCaller } from './../ethereum/lockup/depositToPosition'
import { createWithdrawByPositionCaller } from './../ethereum/lockup/withdrawByPosition'
import { createMigrateToSTokensCaller } from './../ethereum/lockup/migrateToSTokens'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from './../ethereum/lockup/calculateWithdrawableInterestAmountByPosition'
import { stubTransactionResposeFactory } from './../common/utils/for-test'
import { Options, getLockupAddress, positionsCreate } from './positionsCreate'
import { addresses } from './../addresses'
import { assert } from 'console'

describe("agent", () => {
	const host = 'localhost'
	const address = '0x0000000000000000000000000000000000000000'
	const provider = new ethers.providers.JsonRpcProvider(host)

	const arbitrumOneLockup = addresses.arbitrum.one.lockup
	const arbitrumRinkebyLockup = addresses.arbitrum.rinkeby.lockup

	describe("getLockupAddress", () => {
		// it("chainId is 1", async () => {
        //     const result = await getLockupAddress(1, provider)
		// 	const expected =
		// 	expect(result).toEqual(expected)
		// })
		// it("chainId is 3", async () => {

		// })
		it("chainId is 42161", async () => {
            const result = await getLockupAddress(42161, provider)
			expect(result).toEqual(arbitrumOneLockup)
		})
		it("chainId is 421611", async () => {
            const result = await getLockupAddress(421611, provider)
			expect(result).toEqual(arbitrumRinkebyLockup)
		})
	})

    describe("getCreateLockupContract", () => {
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
        // it("chainId is 1", async () => {
        //     console.log(expected)
		// 	const result = await getCreateLockupContract(1, provider).then()

		// 	expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		// 	expect(JSON.stringify(result(address))).toEqual(
		// 		JSON.stringify(expected(address))
		// 	)
		// })
        // it("chainId is 3", async () => {
        //     console.log(expected)
		// 	const result = await getCreateLockupContract(3, provider).then()

		// 	expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		// 	expect(JSON.stringify(result(address))).toEqual(
		// 		JSON.stringify(expected(address))
		// 	)
		// })
        it("chainId is 42161", async () => {
            const expectedLockup = await createLockupContract(provider)

			const expected = await expectedLockup(arbitrumOneLockup)
			const result = await getCreateLockupContract(42161, provider)

			expect(result.toString()).toEqual(expected.toString())
		})
        it("chainId is 421611", async () => {
            const expectedLockup = await createLockupContract(provider)

			const expected = await expectedLockup(arbitrumRinkebyLockup)
			const result = await getCreateLockupContract(421611, provider)

			expect(result.toString()).toEqual(expected.toString())
		})
	})

	// describe("positionsCreate", () => {
	// 	const stubTx = stubTransactionResposeFactory({})

	// 	const detectNetworkFunc = async (): Promise<any> => {
	// 		return { chainId: 1 }
	// 	}

	// 	const options: Options = {
	// 		provider: detectNetworkFunc,
    //         propertyAddress: "0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5",
    //         amount: "100",
	// 		overrides: {
	// 			overrides: undefined,
	// 			fallback: undefined
	// 		}
	// 	}
	// 	it ("", async () => {
    //         const result = await positionsCreate(options)
	// 		console.log(result)
	//     	// expect(result).toEqual(stubTx)
	// 	})
	// })
})
