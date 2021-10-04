import { DevkitClient, client } from './index'
import { createGetVotablePolicy } from './getVotablePolicy'
import { getStats } from './getStats'

describe('index.ts', () => {
	describe('client', () => {
		it('check return object', () => {
			const expected: DevkitClient = {
				createGetVotablePolicy,
				getStats,
			}

			const result = client

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
