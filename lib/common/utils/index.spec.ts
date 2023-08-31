import { DevkitUtils, utils } from './index'
import { execute } from './execute'
import { arrayify } from './arrayify'

describe('index.ts', () => {
	describe('utils', () => {
		it('check return object', () => {
			const expected: DevkitUtils = {
				execute,
				arrayify,
			}

			const result = utils

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
