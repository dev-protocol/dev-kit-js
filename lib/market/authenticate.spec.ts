/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { createAuthenticateCaller } from './authenticate'
import { stubbedWeb3 } from '../utils/for-test'
import { Event } from '../utils/web3-txs'
import Web3 from 'web3'
import { marketAbi } from './abi'

describe('authenticate.ts', () => {
	describe('createAuthenticateCaller', () => {
		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const client = ({
				eth: {
					...{
						Contract: class {
							public abi: any
							public address: string
							public methods: any
							public events = {
								allEvents(
									opts: any,
									callback: (err: Error | null, e: Event) => void
								) {
									setTimeout(() => {
										callback(null, ({
											event: 'Create',
											returnValues: { _metrics: value },
										} as unknown) as Event)
									}, 800)
								},
							}

							constructor(abi: string, address: string) {
								this.abi = abi
								this.address = address

								if (this.abi.some(({ name = '' }) => name === 'authenticate')) {
									// Market Contract
									this.methods = {
										authenticate: (...args: any[]) => ({
											send: async () => {
												// eslint-disable-next-line no-extend-native
												;(Promise.prototype as any).on = function () {
													return this
												}

												return new Promise(() => true)
											},
										}),
									}
								} else {
									// Metrics Contract
									this.methods = {
										property: (...args: any[]) => ({
											call: async () => Promise.resolve(propertyAddress),
										}),
									}
								}
							}
						},
					},
					...stubbedWeb3.eth,
				},
			} as unknown) as Web3

			const expected = value

			const caller = createAuthenticateCaller(
				new client.eth.Contract(marketAbi, '0x...'),
				client
			)

			const result = await caller(propertyAddress, args, {
				metricsFactory: '0x...',
			})

			expect(result).toEqual(expected)
		})

		it('method call failure', async () => {
			const error = 'error'

			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const client = ({
				eth: {
					...{
						Contract: class {
							public abi: any
							public address: string
							public methods: any
							public events = {
								allEvents() {
									// Nothing
								},
							}

							constructor(abi: string, address: string) {
								this.abi = abi
								this.address = address

								if (this.abi.some(({ name = '' }) => name === 'authenticate')) {
									// Market Contract
									this.methods = {
										authenticate: (...args: any[]) => ({
											send: async () => {
												// eslint-disable-next-line no-extend-native
												;(Promise.prototype as any).on = function () {
													return this
												}

												return Promise.reject(error)
											},
										}),
									}
								} else {
									// Metrics Contract
									this.methods = {
										property: (...args: any[]) => ({
											call: async () => Promise.resolve(propertyAddress),
										}),
									}
								}
							}
						},
					},
					...stubbedWeb3.eth,
				},
			} as unknown) as Web3

			const caller = createAuthenticateCaller(
				new client.eth.Contract(marketAbi, '0x...'),
				client
			)

			const result = await caller(propertyAddress, args, {
				metricsFactory: '0x..',
			}).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
