import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateMarketFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createMarketFactoryCaller: CreateMarketFactoryCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'marketFactory' })
