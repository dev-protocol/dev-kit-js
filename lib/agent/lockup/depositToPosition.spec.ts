import { depositToPosition } from './depositToPosition'
import { getLockupContract } from './common'
import { testProviders } from '../common/const'

jest.mock('./common', () => {
	return {
        getLockupContract: jest.fn()
	}
})

describe('depositToPosition.ts', () => {
	const options = {
		provider: testProviders.ropsten,
		positionTokenId: '1',
		amount: '100'
	}
	it('success', async () => {
		const expected = true

		;(getLockupContract as jest.Mock).mockReturnValue({
			depositToPosition: (positionTokenId: string, amount: string) => expected
		})

		const result = await depositToPosition(options)
		expect(result).toEqual(expected)
	})
    it('return undefined if no valid network', async () => {
		const expected = undefined
		;(getLockupContract as jest.Mock).mockReturnValue(undefined)
        const result = await depositToPosition(options)
		expect(result).toEqual(expected)
	})
})
