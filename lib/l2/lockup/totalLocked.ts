/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateTotalLockedCaller = (
	contract: Contract
) => () => Promise<string>

export const createTotalLockedCaller: CreateTotalLockedCaller = (
	contract: Contract
) => always(execute({ contract, method: 'totalLocked' }))
