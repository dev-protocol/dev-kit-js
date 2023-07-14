import multi from '@rollup/plugin-multi-entry'
import dts from 'rollup-plugin-dts'

const plugins = [multi(), dts()]
const [, , , , _mode] = process.argv
const mode =
	_mode === '--index'
		? 0
		: _mode === '--abi'
		? 1
		: _mode === '--l2'
		? 2
		: _mode === '--agent'
		? 3
		: undefined

export default [
	{
		input: [
			'dist/lib/*.d.ts',
			'dist/lib/ethereum/*.d.ts',
			'dist/lib/**/index.d.ts',
			'!dist/lib/index.d.ts',
			'!**/*.spec.*',
			'!dist/lib/l2/**/*',
		],
		output: [{ file: 'dist/tmp/dev-kit.d.ts', format: 'es' }],
		plugins,
	},
	{
		input: ['dist/tmp/dev-kit.d.ts', 'dist/lib/ethereum/**/abi.d.ts'],
		output: [{ file: 'dist/dev-kit.d.ts', format: 'es' }],
		plugins,
	},
	{
		input: [
			'dist/lib/l2/*.d.ts',
			'dist/lib/l2/**/index.d.ts',
			'dist/lib/l2/**/abi.d.ts',
			'!**/*.spec.*',
		],
		output: [{ file: './l2/index.d.ts', format: 'es' }],
		plugins,
	},
	{
		input: 'dist/lib/agent/index.d.ts',
		output: [{ file: './agent/index.d.ts', format: 'es' }],
		plugins,
	},
].filter((_, i) => (typeof mode === 'number' ? i === mode : true))
