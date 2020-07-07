import { createGetVotablePolicy } from './getVotablePolicy'

export type DevkitClient = {
	readonly createGetVotablePolicy: typeof createGetVotablePolicy
}

export const client: DevkitClient = {
	createGetVotablePolicy,
}
