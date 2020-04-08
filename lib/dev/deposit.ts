import { Contract } from 'web3-eth-contract/types'

export type CreateDepositCaller = (
	contract: Contract
) => (to: string, value: string) => Promise<boolean>

export const createDepositCaller: CreateDepositCaller = (
	contract: Contract
) => async (to: string, value: string) =>
	contract.methods
		.deposit([to, value])
		.send()
		.then((result: boolean) => result)
