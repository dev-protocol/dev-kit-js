import { intersection, sort } from 'ramda'
import { STokensContract } from '../s-tokens'

export type CreateDetectSTokens = (
	sTokens: STokensContract
) => (
	propertyAddress: string,
	accountAddress: string
) => Promise<readonly number[]>

const diff = function (a: number, b: number): number {
	return a - b
}
const asc = sort(diff)

export const createDetectSTokens: CreateDetectSTokens =
	(sTokens: STokensContract) =>
	async (
		propertyAddress: string,
		accountAddress: string
	): Promise<readonly number[]> => {
		const [listForProperty, listForOwner] = await Promise.all([
			sTokens.positionsOfProperty(propertyAddress),
			sTokens.positionsOfOwner(accountAddress),
		])
		return asc(intersection(listForProperty, listForOwner))
	}
