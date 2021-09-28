/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateChangeSymbolCaller = (
	contract: Contract,
	client: Web3
) => (nextAuther: string) => Promise<boolean>

export const createChangeSymbolCaller: CreateChangeSymbolCaller =
	(contract: Contract, client: Web3) => async (nextSymbol: string) =>
		execute({
			contract,
			method: 'changeSymbol',
			mutation: true,
			client,
			args: [nextSymbol],
		}).then(T)
