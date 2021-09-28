import { nodeResolve } from '@rollup/plugin-node-resolve'
import multi from '@rollup/plugin-multi-entry'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'

const input = [
	'dist/lib/**/*.js',
	'dist/lib/**/index.js',
	'!**/*.spec.*',
	'!dist/lib/l2/**/*',
]
const inputL2 = [
	'dist/lib/l2/**/*.js',
	'dist/lib/l2/**/index.js',
	'!**/*.spec.*',
]
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
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								node: '12',
							},
						},
					],
				],
			}),
		],
	},
	{
		input: [
			'dist/lib/*.d.ts',
			'dist/lib/**/index.d.ts',
			'!**/*.spec.*',
			'!dist/lib/l2/**/*',
		],
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [multi(), dts()],
	},
	{
		input: inputL2,
		output: [
			{
				file: './l2/index.mjs',
				format: 'es',
			},
		],
		plugins,
	},
	{
		input: inputL2,
		output: [
			{
				file: './l2/index.js',
				format: 'cjs',
			},
		],
		plugins: [
			...plugins,
			getBabelOutputPlugin({
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								node: '12',
							},
						},
					],
				],
			}),
		],
	},
	{
		input: ['dist/lib/l2/*.d.ts', 'dist/lib/l2/**/index.d.ts', '!**/*.spec.*'],
		output: [{ file: './l2/index.d.ts', format: 'es' }],
		plugins: [multi(), dts()],
	},
]
