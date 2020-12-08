/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateShareOfTreasuryCaller = (
	contract: Contract
) => (supply: string) => Promise<string>

export const createShareOfTreasuryCaller: CreateShareOfTreasuryCaller = (
	contract: Contract
) => async (supply: string): Promise<string> =>
	execute({
		contract,
		method: 'shareOfTreasury',
		args: [supply],
	})
