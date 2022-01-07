import { getLockupContract } from './common'
import { positionsCreate } from './positionsCreate'
import { testProviders } from '../common/const'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

jest.mock('./common', () => {
	return {
		getLockupContract: jest.fn(),
	}
})

describe('positionsCreate.ts', () => {
	const overrides = {
		overrides: undefined,
		fallback: undefined,
	}
	const options = {
		provider: testProviders.ropsten,
		propertyAddress: '0x38c4bF6cD20d157EE45553b0fAD13B0c6750b439',
		amount: '100',
		overrides,
	}

	it('success', async () => {
		const stubTx = stubTransactionResposeFactory({})
		;(getLockupContract as jest.Mock).mockReturnValue({
			depositToProperty: (propertyAddress: string, amount: number) => stubTx,
		})

		const result = await positionsCreate(options)
		expect(getLockupContract).toHaveBeenCalledTimes(1)
		expect(result).toEqual(stubTx)
	})
	it('return undefined if network is not valid', async () => {
		;(getLockupContract as jest.Mock).mockReturnValue(undefined)
		expect(await positionsCreate(options)).toEqual(undefined)
	})
})
