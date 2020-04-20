/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract } from 'web3-eth-contract/types'
import { stubbedWeb3 } from './for-test'
import { execute } from './execute'

describe('execute.ts', () => {
	describe('execute', () => {
		it("Execute the contract instance's `methods[passed method]([...passed args]).call` when the options no include mutation property.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				call: callStub,
			}))
			const contract = ({
				methods: {
					foo: fooStub,
				},
			} as unknown) as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]().call` when the options no include mutation and args property.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn(() => ({
				call: callStub,
			}))
			const contract = ({
				methods: {
					foo: fooStub,
				},
			} as unknown) as Contract
			const result = await execute({
				contract,
				method: 'foo',
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0].length).toEqual(0)
		})
		it("Execute the contract instance's `methods[passed method]([...passed args]).call` when the options include mutation property as false.", async () => {
			const callStub = jest.fn(async () => Promise.resolve('value'))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				call: callStub,
			}))
			const contract = ({
				methods: {
					foo: fooStub,
				},
			} as unknown) as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
				mutation: false,
			})
			expect(result).toEqual('value')
			expect(callStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]([...passed args]).send` when the options include mutation is true and args property.", async () => {
			const sendStub = jest.fn(async () => Promise.resolve(true))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				send: sendStub,
			}))
			const contract = ({
				methods: {
					foo: fooStub,
				},
			} as unknown) as Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
				mutation: true,
				client: stubbedWeb3,
			})
			expect(result).toEqual(true)
			expect(sendStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `methods[passed method]().send` when the options include mutation property as true.", async () => {
			const sendStub = jest.fn(async () => Promise.resolve(true))
			const fooStub = jest.fn((arg1: string, arg2: string) => ({
				send: sendStub,
			}))
			const contract = ({
				methods: {
					foo: fooStub,
				},
			} as unknown) as Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: true,
				client: stubbedWeb3,
			})
			expect(result).toEqual(true)
			expect(sendStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0].length).toEqual(0)
		})
	})
})
