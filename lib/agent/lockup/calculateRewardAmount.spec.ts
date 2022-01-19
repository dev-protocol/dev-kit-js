import { calculateRewardAmount } from './calculateRewardAmount'
import { getLockupContract } from './common'
import { testProviders } from '../common/const'

jest.mock('./common', () => {
	return {
		getLockupContract: jest.fn(),
	}
})
describe('calculateRewardAmount.ts', () => {
	const options = {
		provider: testProviders.ropsten,
		propertyAddress: '0x38c4bF6cD20d157EE45553b0fAD13B0c6750b439',
	}

	it('success', async () => {
		const expected = ['abc', '123']
		;(getLockupContract as jest.Mock).mockReturnValue({
			calculateRewardAmount: (propertyAddress: string) => expected,
		})
		const result = await calculateRewardAmount(options)
		expect(result).toEqual(expected)
	})
	it('return undefined if no valid provider', async () => {
		const expected = undefined
		;(getLockupContract as jest.Mock).mockReturnValue({
			calculateRewardAmount: (propertyAddress: string) => undefined,
		})
		const result = await calculateRewardAmount(options)
		expect(result).toEqual(expected)
	})
})
