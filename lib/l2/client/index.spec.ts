import { DevkitClient, client } from './index'
import { createDetectSTokens } from './createDetectSTokens'

describe('index.ts', () => {
	describe('client', () => {
		it('check return object', () => {
			const expected: DevkitClient = {
				createDetectSTokens,
			}

			const result = client

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
