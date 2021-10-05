import { createDetectSTokens } from '../../ethereum/client/createDetectSTokens'

export type DevkitClient = {
	readonly createDetectSTokens: typeof createDetectSTokens
}

export const client: DevkitClient = {
	createDetectSTokens,
}
