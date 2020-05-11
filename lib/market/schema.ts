import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateSchemaCaller = (contract: Contract) => () => Promise<string[]>
interface ParsedValue {
	readonly v: string
	readonly s: boolean
}

export const createSchemaCaller: CreateSchemaCaller = (
	contract: Contract
): (() => Promise<string[]>) => async (): Promise<string[]> =>
	execute({ contract, method: 'schema' }).then(
		(result) =>
			JSON.parse(
				result
					.split(`'`)
					.map<ParsedValue>((v) => ({ v, s: /[[\],:]/.test(v) }))
					.reduce((a, c) => `${a}${c.s ? c.v : `"${c.v}"`}`, '')
			) as string[]
	)
