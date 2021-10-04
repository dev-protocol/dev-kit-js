import { createGetVotablePolicy } from './getVotablePolicy'
import { getStats } from './getStats'

export type DevkitClient = {
	readonly createGetVotablePolicy: typeof createGetVotablePolicy
	readonly getStats: typeof getStats
}

export const client: DevkitClient = {
	createGetVotablePolicy,
	getStats,
}
