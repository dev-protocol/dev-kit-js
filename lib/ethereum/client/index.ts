import { createGetVotablePolicy } from './getVotablePolicy'
import { getStats } from './getStats'
import { createDetectSTokens } from './createDetectSTokens'

export type DevkitClient = {
	readonly createGetVotablePolicy: typeof createGetVotablePolicy
	readonly getStats: typeof getStats
	readonly createDetectSTokens: typeof createDetectSTokens
}

export const client: DevkitClient = {
	createGetVotablePolicy,
	getStats,
	createDetectSTokens,
}
