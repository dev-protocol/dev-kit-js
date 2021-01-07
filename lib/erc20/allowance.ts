/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateAllowanceCaller = (
	contract: Contract
) => (from: string, to: string) => Promise<string>

export const createAllowanceCaller: CreateAllowanceCaller = (
	contract: Contract
) => async (from: string, to: string) =>
	execute({
		contract,
		method: 'allowance',
		args: [from, to],
	})
