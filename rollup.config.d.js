import multi from '@rollup/plugin-multi-entry'
import dts from 'rollup-plugin-dts'

const plugins = [multi(), dts()]

export default [
	{
		input: [
			'dist/lib/*.d.ts',
			'dist/lib/ethereum/*.d.ts',
			'dist/lib/ethereum/**/abi.d.ts',
			'dist/lib/**/index.d.ts',
			'!dist/lib/index.d.ts',
			'!**/*.spec.*',
			'!dist/lib/l2/**/*',
		],
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
]
