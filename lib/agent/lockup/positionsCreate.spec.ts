import { getLockupContract } from './common'
import { Options, positionsCreate } from './positionsCreate'
import { testProviders } from '../common/const'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

// jest.mock('./common', () => {
// 	return {
// 		getLockupContract: jest.fn().mockReturnValue({depositToProperty: (propertyAddress: string, amount: number) => stubTransactionResposeFactory})
// 	};
// });

jest.mock('./common', () => {
	return {
        getLockupContract: jest.fn()
	}
})

describe('positionsCreate.ts', () => {
	const propertyAddress = '0x38c4bF6cD20d157EE45553b0fAD13B0c6750b439'
	const amount = '100'
	const overrides = {
		overrides: undefined,
		fallback: undefined,
	}

	it('success', async () => {
		(getLockupContract as jest.Mock).mockReturnValueOnce({depositToProperty: (propertyAddress: string, amount: number) => stubTransactionResposeFactory})
		const options: Options = {
			provider: testProviders.ropsten,
			propertyAddress,
			amount,
			overrides,
		}
		const result = await positionsCreate(options)
		expect(getLockupContract).toHaveBeenCalledTimes(1)
        expect(result).toEqual(stubTransactionResposeFactory)
	})
	it('return undefined if network is not valid', async () => {
		(getLockupContract as jest.Mock).mockReturnValueOnce(undefined)
		const options: Options = {
			provider: testProviders.polyMumbai,
			propertyAddress,
			amount,
			overrides,
		}
		expect(await positionsCreate(options)).toEqual(undefined)
	})
})
