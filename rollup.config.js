import { nodeResolve } from '@rollup/plugin-node-resolve'
import multi from '@rollup/plugin-multi-entry'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'

const input = ['dist/lib/*.js', 'dist/lib/**/index.js', '!**/*.spec.*']
const plugins = [multi(), nodeResolve({ modulesOnly: true })]

export default [
	{
		input,
		output: [
			{
				file: 'dist/index.mjs',
				format: 'es',
			},
		],
		plugins,
	},
	{
		input,
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
			},
		],
		plugins: [
			...plugins,
			getBabelOutputPlugin({
				presets: ['@babel/preset-env'],
			}),
		],
	},
	{
		input: ['dist/lib/*.d.ts', 'dist/lib/**/index.d.ts', '!**/*.spec.*'],
		output: [{ file: 'dist/dev-kit.d.ts', format: 'es' }],
		plugins: [multi(), dts()],
	},
]
