import helloWorld from '.'

test('test of hello world', () => {
	const name = 'abyssparanoia'
	const result = helloWorld(name)
	expect(result).toBe(`Hello World! Mr.${name}`)
})
