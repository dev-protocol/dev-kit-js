/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable @typescript-eslint/no-var-requires */

const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const alias = require('@rollup/plugin-alias')
const { terser } = require('rollup-plugin-terser')
const globby = require('globby')
const { default: PQueue } = require('p-queue')

const inputOptions = (opts) => ({
	plugins: [
		alias({
			entries: [
				{ find: 'web3', replacement: 'node_modules/web3/dist/web3.min.js' },
			],
		}),
		nodeResolve({ mainFields: ['browser'], preferBuiltins: true }),
		commonjs({
			dynamicRequireTargets: ['node_modules/readable-stream/lib/*.js'],
		}),
		json(),
		terser({
			warnings: true,
			ecma: 2017,
			compress: {
				unsafe: true,
			},
			output: {
				comments: false,
			},
		}),
	],
	onwarn: (warning) => {
		if (warning.code === 'THIS_IS_UNDEFINED') {
			return
		}
		console.warn(warning.message)
	},
	...opts,
})
const outputOptions = (opts) => ({
	format: 'esm',
	...opts,
})
const queue = new PQueue({ concurrency: 1 })

;(async (wait) => {
	const paths = await wait

	console.log({ paths })

	queue.addAll(
		paths.map((path) => async () => {
			console.log({ path })
			const input = inputOptions({ input: path })
			const bundle = await rollup.rollup(input)
			const output = outputOptions({
				file: input.input.replace('dist/lib/', 'bundled/'),
			})

			await bundle.generate(output)
			await bundle.write(output)
			await bundle.close()
		})
	)
})(globby(['dist/lib/**/index.js']))
