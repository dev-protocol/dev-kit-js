/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-class */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { waitForCreateMetrics } from './waitForCreateMetrics'
import { stubbedWeb3 } from './for-test'
import { Event } from './web3-txs'
import Web3 from 'web3'

describe('waitForCreateMetrics.ts', () => {
	describe('waitForCreateMetrics', () => {
		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const metricsFactoryAddress = '0xaE186E6B063Ff8a33bB82Abd7fDb2872740D2CF0'
			const mockGetBlockNumber = jest
				.fn()
				.mockImplementation(() => Promise.resolve(123))

			const client = {
				eth: {
					...{
						Contract: class {
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
								this.address = address
								this.methods = {
									property: (...args: readonly any[]) => ({
										call: async () => Promise.resolve(propertyAddress),
									}),
								}
							}
						},
						getBlockNumber: mockGetBlockNumber,
					},
					...stubbedWeb3.eth,
				},
			} as unknown as Web3

			const expected = value

			const result = await waitForCreateMetrics(
				client as any,
				propertyAddress,
				metricsFactoryAddress
			)

			expect(result).toEqual(expected)
			expect(mockGetBlockNumber.mock.calls.length).toBe(1)
		})
		it('method call failure on event handling', async () => {
			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const metricsFactoryAddress = '0xaE186E6B063Ff8a33bB82Abd7fDb2872740D2CF0'
			const mockGetBlockNumber = jest
				.fn()
				.mockImplementation(() => Promise.resolve(123))

			const client = {
				eth: {
					...{
						Contract: class {
							public readonly address: string
							public readonly methods: any
							public readonly events = {
								allEvents(
									opts: any,
									callback: (err: Error | null, e: Event) => void
								) {
									setTimeout(() => {
										callback(new Error('error on allEvents'), null as any)
									}, 800)
								},
							}

							constructor(abi: string, address: string) {
								this.address = address
								this.methods = {
									property: (...args: readonly any[]) => ({
										call: async () => Promise.resolve(propertyAddress),
									}),
								}
							}
						},
						getBlockNumber: mockGetBlockNumber,
					},
					...stubbedWeb3.eth,
				},
			} as unknown as Web3

			const result = await waitForCreateMetrics(
				client as any,
				propertyAddress,
				metricsFactoryAddress
			).catch((err) => err)

			expect(result.message).toEqual('error on allEvents')
			expect(mockGetBlockNumber.mock.calls.length).toBe(1)
		})
		it('method call failure on event resolver', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const metricsFactoryAddress = '0xaE186E6B063Ff8a33bB82Abd7fDb2872740D2CF0'
			const mockGetBlockNumber = jest
				.fn()
				.mockImplementation(() => Promise.resolve(123))

			const client = {
				eth: {
					...{
						Contract: class {
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
								this.address = address
								this.methods = {
									property: (...args: readonly any[]) => ({
										call: async () =>
											Promise.reject(new Error('error on resolver')),
									}),
								}
							}
						},
						getBlockNumber: mockGetBlockNumber,
					},
					...stubbedWeb3.eth,
				},
			} as unknown as Web3

			const result = await waitForCreateMetrics(
				client as any,
				propertyAddress,
				metricsFactoryAddress
			).catch((err) => err)

			expect(result.message).toEqual('error on resolver')
			expect(mockGetBlockNumber.mock.calls.length).toBe(1)
		})
	})
})
