import { execute } from './execute'

export type DevkitUtils = {
	readonly execute: typeof execute
}

export const utils: DevkitUtils = {
	execute,
}
