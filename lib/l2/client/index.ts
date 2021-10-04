import { createDetectSTokens } from './createDetectSTokens'

export type DevkitClient = {
	readonly createDetectSTokens: typeof createDetectSTokens
}

export const client: DevkitClient = {
	createDetectSTokens,
}
