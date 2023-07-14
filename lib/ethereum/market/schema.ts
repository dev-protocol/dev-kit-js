import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateSchemaCaller = (
	contract: ethers.Contract,
) => () => Promise<readonly string[]>
type ParsedValue = {
	readonly v: string
	readonly s: boolean
}

export const createSchemaCaller: CreateSchemaCaller = (
	contract: ethers.Contract,
): (() => Promise<readonly string[]>) =>
	always(
		execute<QueryOption>({ contract, method: 'schema', mutation: false }).then(
			(result) =>
				JSON.parse(
					result
						.split(`'`)
						.map<ParsedValue>((v) => ({ v, s: /[[\],:]/.test(v) }))
						.reduce((a, c) => `${a}${c.s ? c.v : `"${c.v}"`}`, ''),
				) as readonly string[],
		),
	)
