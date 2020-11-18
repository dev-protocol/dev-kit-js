import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateBalanceOfCaller = (
	contract: Contract
) => (address: string) => Promise<string>

export const createBalanceOfCaller: CreateBalanceOfCaller = (
	contract: Contract
) => async (address: string) =>
	execute({ contract, method: 'balanceOf', args: [address] })
