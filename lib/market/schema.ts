import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateSchemaCaller = (
	contract: Contract
) => () => Promise<readonly string[]>
type ParsedValue = {
	readonly v: string
	readonly s: boolean
}

export const createSchemaCaller: CreateSchemaCaller = (
	contract: Contract
): (() => Promise<readonly string[]>) =>
	always(
		execute({ contract, method: 'schema' }).then(
			(result) =>
				JSON.parse(
					result
						.split(`'`)
						.map<ParsedValue>((v) => ({ v, s: /[[\],:]/.test(v) }))
						.reduce((a, c) => `${a}${c.s ? c.v : `"${c.v}"`}`, '')
				) as readonly string[]
		)
	)
