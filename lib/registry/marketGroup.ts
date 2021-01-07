/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateMarketGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createMarketGroupCaller: CreateMarketGroupCaller = (
	contract: Contract
) => always(execute({ contract, method: 'marketGroup' }))
