import { Contract } from 'web3-eth-contract/types'

export type CreateDepositCaller = (
	contract: Contract
) => (to: string, value: number) => Promise<boolean>

export const createDepositCaller: CreateDepositCaller = (
	contract: Contract
) => async (to: string, value: number) =>
	contract.methods
		.deposit([to, value])
		.call()
		.then((result: boolean) => result)
