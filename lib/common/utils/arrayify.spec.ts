import { arrayify } from './arrayify'

describe('arrayify.ts', () => {
	it("Returns an array of values from the passed object by numeric key's", async () => {
		const obj = {
			0: 'A',
			1: 'B',
			2: 'C',
			str: 'D',
		}
		const result = arrayify(obj)
		expect(result).toEqual(['A', 'B', 'C'])
	})
})
