import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateMarketGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createMarketGroupCaller: CreateMarketGroupCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'marketGroup' })
