import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateSchemaCaller = (contract: Contract) => () => Promise<string[]>

export const createSchemaCaller: CreateSchemaCaller = (
	contract: Contract
): (() => Promise<string[]>) => async () =>
	execute<string>({ contract, method: 'schema' }).then(
		(result: string) => JSON.parse(result) as string[]
	)
