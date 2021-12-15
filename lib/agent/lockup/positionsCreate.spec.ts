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

// describe('agent', () => {
// 	const host = 'localhost'
// 	const address = '0x0000000000000000000000000000000000000000'
// 	const provider = new ethers.providers.JsonRpcProvider(host)

// 	const arbitrumOneLockup = addresses.arbitrum.one.lockup
// 	const arbitrumRinkebyLockup = addresses.arbitrum.rinkeby.lockup



// 	// describe("positionsCreate", () => {
// 	// 	const stubTx = stubTransactionResposeFactory({})

// 	// 	const detectNetworkFunc = async (): Promise<any> => {
// 	// 		return { chainId: 1 }
// 	// 	}

// 	// 	const options: Options = {
// 	// 		provider: detectNetworkFunc,
// 	//         propertyAddress: "0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5",
// 	//         amount: "100",
// 	// 		overrides: {
// 	// 			overrides: undefined,
// 	// 			fallback: undefined
// 	// 		}
// 	// 	}
// 	// 	it ("", async () => {
// 	//         const result = await positionsCreate(options)
// 	// 		console.log(result)
// 	//     	// expect(result).toEqual(stubTx)
// 	// 	})
// 	// })
// })
