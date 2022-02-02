import { nodeResolve } from '@rollup/plugin-node-resolve'
import multi from '@rollup/plugin-multi-entry'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

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
const pluginsCjs = [
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
]
const external = ['ethers']

export default [
	{
		input,
		external,
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
		external,
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
			},
		],
		plugins: pluginsCjs,
	},
	{
		external,
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
		external,
		input: inputL2,
		output: [
			{
				file: './l2/index.js',
				format: 'cjs',
			},
		],
		plugins: pluginsCjs,
	},
	{
		external,
		input: 'dist/lib/agent/index.js',
		output: [
			{
				file: './agent/index.mjs',
				format: 'es',
			},
		],
		plugins,
	},
	{
		external,
		input: 'dist/lib/agent/index.js',
		output: [
			{
				file: './agent/index.js',
				format: 'cjs',
			},
		],
		plugins: pluginsCjs,
	},
]
