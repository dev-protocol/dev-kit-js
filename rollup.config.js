import { nodeResolve } from '@rollup/plugin-node-resolve'
import multi from '@rollup/plugin-multi-entry'
import dts from 'rollup-plugin-dts'

export default [
	{
		input: ['dist/lib/*.js', 'dist/lib/**/index.js', '!**/*.spec.*'],
		output: [
			{
				file: 'dist/index.mjs',
				format: 'es',
			},
			{
				file: 'dist/index.js',
				format: 'cjs',
			},
		],
		plugins: [multi(), nodeResolve({ modulesOnly: true })],
	},
	{
		input: ['dist/lib/*.d.ts', 'dist/lib/**/index.d.ts', '!**/*.spec.*'],
		output: [{ file: 'dist/dev-kit.d.ts', format: 'es' }],
		plugins: [multi(), dts()],
	},
]
