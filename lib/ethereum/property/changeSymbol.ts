import { ethers } from 'ethers'
import { execute, MutationOption } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateChangeSymbolCaller = (
	contract: ethers.Contract
) => (nextAuther: string) => Promise<boolean>

export const createChangeSymbolCaller: CreateChangeSymbolCaller =
	(contract: ethers.Contract) => async (nextSymbol: string) =>
		execute<MutationOption>({
			contract,
			method: 'changeSymbol',
			mutation: true,
			args: [nextSymbol],
		}).then(T)
