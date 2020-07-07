import { DevkitUtils, utils } from './index'
import { execute } from './execute'
import { getAccount } from './getAccount'
import { txPromisify } from './txPromisify'
import { watchEvent } from './watchEvent'

describe('index.ts', () => {
	describe('utils', () => {
		it('check return object', () => {
			const expected: DevkitUtils = {
				execute,
				getAccount,
				txPromisify,
				watchEvent,
			}

			const result = utils

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
