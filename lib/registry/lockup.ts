/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateLockupCaller = (contract: Contract) => () => Promise<string>

export const createLockupCaller: CreateLockupCaller = (contract: Contract) =>
	always(execute({ contract, method: 'lockup' }))
