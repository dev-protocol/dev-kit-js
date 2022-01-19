import { getCap } from './cap'
import { getLockupContract } from './common'
import { testProviders } from '../common/const'

jest.mock('./common', () => {
	return {
		getLockupContract: jest.fn(),
	}
})

describe('cap.ts', () => {
	const options = {
		provider: testProviders.ropsten,
	}

	it('success', async () => {
		const expected = '123456'
		;(getLockupContract as jest.Mock).mockReturnValue({
			cap: () => expected,
		})
		const result = await getCap(options)
		expect(result).toEqual(expected)
	})

	it('return undefined if no valid provider', async () => {
		const expected = undefined
		;(getLockupContract as jest.Mock).mockReturnValue(expected)
		const result = await getCap(options)
		expect(result).toEqual(expected)
	})
})
