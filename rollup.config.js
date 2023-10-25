import { nodeResolve } from '@rollup/plugin-node-resolve'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import packageJson from './package.json' assert { type: 'json' }

const plugins = [nodeResolve({ modulesOnly: true })]
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
const external = [
	...Object.keys(packageJson.dependencies),
	...Object.keys(packageJson.peerDependencies),
]
console.log('External packages:', external)
const [, , , _mode] = process.argv
const mode = _mode === '--esm' ? 'es' : _mode === '--cjs' ? 'cjs' : undefined

export default [
	{
		input: 'dist/lib/index.js',
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
		input: 'dist/lib/index.js',
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
		input: 'dist/lib/l2/index.js',
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
		input: 'dist/lib/l2/index.js',
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
].filter((x) => (mode ? x.output.every(({ format }) => format === mode) : x))
