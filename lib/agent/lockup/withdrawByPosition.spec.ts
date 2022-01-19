import { testProviders } from '../common/const'
import { getLockupContract } from './common'
import { withdrawByPosition } from './withdrawByPosition'

jest.mock('./common', () => {
	return {
		getLockupContract: jest.fn(),
	}
})

describe('withdrawByPosition.ts', () => {
	const options = {
		provider: testProviders.ropsten,
		positionTokenId: '1',
		amount: '100',
	}
	it('success', async () => {
		const expected = true
		;(getLockupContract as jest.Mock).mockReturnValue({
			withdrawByPosition: (positionTokenId: string, amount: string) => true,
		})
		const result = await withdrawByPosition(options)
		expect(result).toEqual(expected)
	})

	it('return undefined if no valid provider', async () => {
		const expected = undefined
		;(getLockupContract as jest.Mock).mockReturnValue({
			withdrawByPosition: () => undefined,
		})
		const result = await withdrawByPosition(options)
		expect(result).toEqual(expected)
	})
})
