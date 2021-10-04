import { DevkitUtils, utils } from './index'
import { execute } from './execute'

describe('index.ts', () => {
	describe('utils', () => {
		it('check return object', () => {
			const expected: DevkitUtils = {
				execute,
			}

			const result = utils

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
