import { calculateWithdrawableInterestAmountByPosition } from './calculateWithdrawableInterestAmountByPosition'
import { getLockupContract } from './common'
import { testProviders } from '../common/const'

jest.mock('./common', () => {
	return {
		getLockupContract: jest.fn(),
	}
})

describe('calculateWithdrawableInterestAmountByPosition.ts', () => {
	const options = {
		provider: testProviders.ropsten,
		positionTokenId: '1',
	}

	it('success', async () => {
		const expected = '123'
		;(getLockupContract as jest.Mock).mockReturnValue({
			calculateWithdrawableInterestAmountByPosition: (
				positionTokenId: string
			) => expected,
		})
		const result = await calculateWithdrawableInterestAmountByPosition(options)
		expect(result).toEqual(expected)
	})

	it('return undefined if no valid network', async () => {
		const expected = undefined
		;(getLockupContract as jest.Mock).mockReturnValue(undefined)
		const result = await calculateWithdrawableInterestAmountByPosition(options)
		expect(result).toEqual(expected)
	})
})
