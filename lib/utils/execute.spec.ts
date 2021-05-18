/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract } from 'web3-eth-contract/types'
import { stubbedWeb3 } from './for-test'
import { execute } from './execute'

const TXPROMISIFY_TXPROMISIFY_MOCK_RETURN = 'test'
jest.mock('./txPromisify', () => ({
	txPromisify: jest.fn(async () =>
		Promise.resolve(TXPROMISIFY_TXPROMISIFY_MOCK_RETURN)
	),
}))

describe('execute.ts', () => {
	describe('execute', () => {
		it("Execute the contract instance's `methods[passed method]([...passed args]).call` when the options no include mutation property.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				call: callStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(callStub.mock.calls[0]).toEqual([])
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]([...passed args]).call({from: account})` when the options include client and args, and not include mutation property.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				call: callStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				client: stubbedWeb3,
				method: 'foo',
				args: ['abc', 'xyz'],
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(callStub.mock.calls[0]).toEqual([{ from: '0x' }])
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]().call` when the options no include mutation and not include args property.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn(() => ({
				call: callStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				method: 'foo',
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(callStub.mock.calls[0]).toEqual([])
			expect(fooStub.mock.calls[0].length).toEqual(0)
		})
		it("Execute the contract instance's `methods[passed method]().call({from: acount})` when the options include client and not include mutation and args property.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn(() => ({
				call: callStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				client: stubbedWeb3,
				method: 'foo',
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(callStub.mock.calls[0]).toEqual([{ from: '0x' }])
			expect(fooStub.mock.calls[0].length).toEqual(0)
		})
		it("Execute the contract instance's `methods[passed method]([...passed args]).call` when the options include mutation property as false.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				call: callStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
				mutation: false,
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(callStub.mock.calls[0]).toEqual([])
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]([...passed args]).send` when the options include mutation is true and args property.", async () => {
			const sendStub = jest.fn(async () => Promise.resolve(true))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				send: sendStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
				mutation: true,
				client: stubbedWeb3,
			})
			expect(result).toEqual(TXPROMISIFY_TXPROMISIFY_MOCK_RETURN)
			expect(sendStub.mock.calls.length).toEqual(1)
			expect(sendStub.mock.calls[0]).toEqual([{ from: '0x' }])
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]().send` when the options include mutation property as true.", async () => {
			const sendStub = jest.fn(async () => Promise.resolve(true))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				send: sendStub,
			}))
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: true,
				client: stubbedWeb3,
			})
			expect(result).toEqual(TXPROMISIFY_TXPROMISIFY_MOCK_RETURN)
			expect(sendStub.mock.calls.length).toEqual(1)
			expect(sendStub.mock.calls[0]).toEqual([{ from: '0x' }])
			expect(fooStub.mock.calls[0].length).toEqual(0)
		})
		it('empty-padding to an arguments array if `padEnd` is specified', async () => {
			const sendStub = jest.fn(async () => Promise.resolve(true))
			const fooStub = jest.fn(
				(
					arg1: string,
					arg2: string,
					arg3: string,
					arg4: boolean,
					arg5: boolean,
					arg6: string,
					arg7: string,
					arg8: string
					// eslint-disable-next-line max-params
				) => ({
					send: sendStub,
				})
			)
			const contract = {
				methods: {
					foo: fooStub,
				},
			} as unknown as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz', '', true, false],
				mutation: true,
				client: stubbedWeb3,
				padEnd: 8,
			})
			expect(result).toEqual(TXPROMISIFY_TXPROMISIFY_MOCK_RETURN)
			expect(sendStub.mock.calls.length).toEqual(1)
			expect(sendStub.mock.calls[0]).toEqual([{ from: '0x' }])
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
			expect(fooStub.mock.calls[0][2]).toEqual('')
			expect(fooStub.mock.calls[0][3]).toEqual(true)
			expect(fooStub.mock.calls[0][4]).toEqual(false)
			expect(fooStub.mock.calls[0][5]).toEqual('')
			expect(fooStub.mock.calls[0][6]).toEqual('')
			expect(fooStub.mock.calls[0][7]).toEqual('')
			// @ts-expect-error
			expect(fooStub.mock.calls[0][8]).toEqual(undefined)
		})
	})
})
