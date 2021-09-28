import { execute } from './execute'
import { getAccount } from './getAccount'
import { txPromisify } from './txPromisify'
import { watchEvent } from './watchEvent'

export type DevkitUtils = {
	readonly execute: typeof execute
	readonly getAccount: typeof getAccount
	readonly txPromisify: typeof txPromisify
	readonly watchEvent: typeof watchEvent
}

export const utils: DevkitUtils = {
	execute,
	getAccount,
	txPromisify,
	watchEvent,
}
