/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import { createAllocateCaller } from './allocate'
import { stubbedWeb3 } from '../utils/for-test'
import { allocatorAbi } from './abi'
import Web3 from 'web3'

describe('allocate.ts', () => {
	describe('createAllocateCaller', () => {
		it('call success', async () => {
			const metrics = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '986729457623035'

			const client = ({
				eth: {
					...{
						Contract: class {
							public readonly abi: any
							public readonly address: string
							public readonly methods: any
							public readonly events = {
								allEvents(
									opts: any,
									callback: (err: Error | null, e: Event) => void
								) {
									setTimeout(() => {
										callback(null, ({
											event: 'AllocationResult',
											returnValues: { _metrics: metrics, _result: value },
										} as unknown) as Event)
									}, 800)
								},
							}

							constructor(abi: string, address: string) {
								this.abi = abi
								this.address = address
								this.methods = {
									allocate: (...args: readonly any[]) => ({
										send: async () => {
											// eslint-disable-next-line no-extend-native
											;(Promise.prototype as any).on = function () {
												return this
											}
											return new Promise(() => true)
										},
									}),
								}
							}
						},
					},
					...stubbedWeb3.eth,
				},
			} as unknown) as Web3

			const caller = createAllocateCaller(
				new client.eth.Contract([...allocatorAbi], '0x...'),
				client
			)

			const result = await caller(metrics)

			expect(result).toEqual(value)
		})

		it('call failure', async () => {
			const error = 'error'
			const metrics = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const client = ({
				eth: {
					...{
						Contract: class {
							public readonly abi: any
							public readonly address: string
							public readonly methods: any
							public readonly events = {
								allEvents() {
									// Nothing
								},
							}

							constructor(abi: string, address: string) {
								this.abi = abi
								this.address = address
								this.methods = {
									allocate: (...args: readonly any[]) => ({
										send: async () => {
											// eslint-disable-next-line no-extend-native
											;(Promise.prototype as any).on = function () {
												return this
											}
											return Promise.reject(error)
										},
									}),
								}
							}
						},
					},
					...stubbedWeb3.eth,
				},
			} as unknown) as Web3

			const caller = createAllocateCaller(
				new client.eth.Contract([...allocatorAbi], '0x...'),
				client
			)

			const result = await caller(metrics).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
