/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-class */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'
import { stubbedWeb3, stubbedSendTx } from '../../common/utils/for-test'
import { Event } from '../../common/utils/web3-txs'
import Web3 from 'web3'
import { propertyFactoryAbi } from './abi'

describe('createAndAuthenticateCaller.ts', () => {
	describe('createCreateAndAuthenticateCaller', () => {
		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const propertyFactoryContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					createAndAuthenticate: (
						name: string,
						symbol: string,
						author: string
					) => ({
						send: jest
							.fn()
							.mockImplementation(async () =>
								stubbedSendTx({ name: 'Create', property: '_property', value })
							),
					}),
				},
			}
			const client = {
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
										callback(null, {
											event: 'Create',
											returnValues: { _metrics: value },
										} as unknown as Event)
									}, 800)
								},
							}

							constructor(abi: string, address: string) {
								this.abi = abi
								this.address = address

								this.methods = {
									property: (...args: readonly any[]) => ({
										call: async () => Promise.resolve(propertyAddress),
									}),
								}
							}
						},
						getBlockNumber: () => Promise.resolve(123),
					},
					...stubbedWeb3.eth,
				},
			} as unknown as Web3

			const expected = value

			const caller = createCreateAndAuthenticateCaller(
				propertyFactoryContract as any,
				client
			)

			const result = await caller('name', 'SYMBOL', '0x0', args, {
				metricsFactory: '0x...',
			})

			expect(result.property).toEqual(propertyAddress)
			expect(result.transaction).toEqual({
				status: true,
				events: {
					Create: {
						event: 'Create',
						returnValues: {
							_property: propertyAddress,
						},
					},
				},
			})

			const result2 = await result.waitForAuthentication()

			expect(result2).toEqual(value)
		})

		it('method call failure', async () => {
			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const propertyFactoryContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					createAndAuthenticate: (
						name: string,
						symbol: string,
						author: string
					) => ({
						send: jest
							.fn()
							.mockImplementation(async () =>
								stubbedSendTx(
									{ name: 'Create', property: '_property', value: '' },
									true
								)
							),
					}),
				},
			}
			const client = {
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
									property: (...args: readonly any[]) => ({
										call: async () => Promise.resolve(propertyAddress),
									}),
								}
							}
						},
						getBlockNumber: () => Promise.resolve(123),
					},
					...stubbedWeb3.eth,
				},
			} as unknown as Web3

			const caller = createCreateAndAuthenticateCaller(
				propertyFactoryContract as any,
				client
			)

			const result = await caller('name', 'SYMBOL', '0x0', args, {
				metricsFactory: '0x..',
			}).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
