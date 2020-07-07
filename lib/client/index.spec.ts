import { DevkitClient, client } from './index'
import { createGetVotablePolicy } from './getVotablePolicy'

describe('index.ts', () => {
	describe('client', () => {
		it('check return object', () => {
			const expected: DevkitClient = {
				createGetVotablePolicy,
			}

			const result = client

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
