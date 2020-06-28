import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateTotalSupplyCaller = (
	contract: Contract
) => () => Promise<string>

export const createTotalSupplyCaller: CreateTotalSupplyCaller = (
	contract: Contract
	// eslint-disable-next-line functional/functional-parameters
) => async () => execute({ contract, method: 'totalSupply' })
