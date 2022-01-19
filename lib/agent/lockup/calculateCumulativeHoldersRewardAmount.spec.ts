import { ethers } from 'ethers'
import { testProviders } from '../common/const'
import { calculateCumulativeHoldersRewardAmount } from './calculateCumulativeHoldersRewardAmount'
import { getLockupContract } from './common'

jest.mock('./common', () => {
	return {
		getLockupContract: jest.fn(),
	}
})

describe('calculateCumulativeHoldersRewardAmount.ts', () => {
	const options = {
		provider: testProviders.ropsten,
		propertyAddress: '0x38c4bF6cD20d157EE45553b0fAD13B0c6750b439',
	}
	it('success', async () => {
		const expected = '100'
		;(getLockupContract as jest.Mock).mockReturnValue({
			calculateCumulativeHoldersRewardAmount: (property: string) => expected,
		})
		const result = await calculateCumulativeHoldersRewardAmount(options)
		expect(result).toEqual(expected)
	})
	it('return undefined if no valid network', async () => {
		const expected = undefined
		;(getLockupContract as jest.Mock).mockReturnValue(undefined)
		const result = await calculateCumulativeHoldersRewardAmount(options)
		expect(result).toEqual(expected)
	})
})
