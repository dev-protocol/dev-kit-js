import { execute } from './execute'
import { arrayify } from './arrayify'

export type DevkitUtils = {
	readonly execute: typeof execute
	readonly arrayify: typeof arrayify
}

export const utils: DevkitUtils = {
	execute,
	arrayify,
}

export { execute, arrayify }
