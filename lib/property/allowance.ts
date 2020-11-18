// import { Contract } from 'web3-eth-contract/types'
// import Web3 from 'web3'
// import { execute } from '../utils/execute'
// import { T } from 'ramda'

// export type CreateAllowanceCaller = (
// 	contract: Contract,
// 	client: Web3
// ) => (from: string, to: string, value: string) => Promise<string>

// export const createAllowanceCaller: CreateAllowanceCaller = (
// 	contract: Contract,
// 	client: Web3
// ) => async (from: string, to: string) =>
// 	execute({
// 		contract,
// 		method: 'allowance',
// 		mutation: true,
// 		client,
// 		args: [from, to],
// 	}).then(T)
