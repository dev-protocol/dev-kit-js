/* eslint-disable @typescript-eslint/no-unused-vars */
import { BigNumber, ethers } from 'ethers'
import { execute } from './execute'

describe('execute.ts', () => {
	describe('execute', () => {
		it("Execute the contract instance's `[passed method]([...passed args])` when the mutation is false.", async () => {
			const fooStub = jest.fn(async (arg1: string, arg2: string) =>
				Promise.resolve('value')
			)
			const contract = {
				foo: fooStub,
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
				mutation: false,
			})
			expect(result).toEqual('value')
			expect(fooStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `[passed method]()` when the mutation is false and not include args property.", async () => {
			const fooStub = jest.fn(async () => Promise.resolve('value'))
			const contract = {
				foo: fooStub,
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual('value')
			expect(fooStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0]).toEqual([])
		})
		it("Execute the contract instance's `[passed method]([...passed args])` when the mutation is true.", async () => {
			const fooStub = jest.fn(async (arg1: string, arg2: string) =>
				Promise.resolve(true)
			)
			const contract = {
				foo: fooStub,
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz'],
				mutation: true,
			})
			expect(result).toEqual(true)
			expect(fooStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][0][1]).toEqual('xyz')
		})
		it("Execute the contract instance's `[passed method]()` when the mutation is true not include args property.", async () => {
			const fooStub = jest.fn(async () => Promise.resolve(true))
			const contract = {
				foo: fooStub,
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: true,
			})
			expect(result).toEqual(true)
			expect(fooStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0]).toEqual([])
		})
		it('empty-padding to an arguments array if `padEnd` is specified', async () => {
			const fooStub = jest.fn(
				async (
					arg1: string,
					arg2: string,
					arg3: string,
					arg4: boolean,
					arg5: boolean,
					arg6: string,
					arg7: string,
					arg8: string
					// eslint-disable-next-line max-params
				) => Promise.resolve(true)
			)
			const contract = {
				foo: fooStub,
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', 'xyz', '', true, false],
				mutation: true,
				padEnd: 8,
			})
			expect(result).toEqual(true)
			expect(fooStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][0][1]).toEqual('xyz')
			expect(fooStub.mock.calls[0][0][2]).toEqual('')
			expect(fooStub.mock.calls[0][0][3]).toEqual(true)
			expect(fooStub.mock.calls[0][0][4]).toEqual(false)
			expect(fooStub.mock.calls[0][0][5]).toEqual('')
			expect(fooStub.mock.calls[0][0][6]).toEqual('')
			expect(fooStub.mock.calls[0][0][7]).toEqual('')
			expect(fooStub.mock.calls[0][0][8]).toEqual(undefined)
		})
	})
	describe('execute: stringify', () => {
		it('Returns string', async () => {
			const contract = {
				foo: jest.fn(async () => Promise.resolve('value')),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual('value')
		})
		it('Returns number', async () => {
			const contract = {
				foo: jest.fn(async () => Promise.resolve(123456789)),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual(123456789)
		})
		it('Returns boolean', async () => {
			const contract = {
				foo: jest.fn(async () => Promise.resolve(false)),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual(false)
		})
		it('Returns array of string, number, boolean', async () => {
			const contract = {
				foo: jest.fn(async () => Promise.resolve(['value', 123456789, false])),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual(['value', 123456789, false])
		})
		it('Returns string when the response is BigNumber', async () => {
			const contract = {
				foo: jest.fn(async () => Promise.resolve(BigNumber.from(123456789))),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual('123456789')
		})
		it('Returns array of string, number, boolean when the response included BigNumber', async () => {
			const contract = {
				foo: jest.fn(async () =>
					Promise.resolve([
						'value',
						123456789,
						false,
						BigNumber.from(123456789),
					])
				),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual(['value', 123456789, false, '123456789'])
		})
		it('Returns object of string, number, boolean when the response included BigNumber', async () => {
			const contract = {
				foo: jest.fn(async () =>
					Promise.resolve({
						0: 'value',
						1: 123456789,
						2: false,
						3: BigNumber.from(123456789),
						a: 'value',
						b: 123456789,
						c: false,
						d: BigNumber.from(123456789),
					})
				),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual({
				0: 'value',
				1: 123456789,
				2: false,
				3: '123456789',
				a: 'value',
				b: 123456789,
				c: false,
				d: '123456789',
			})
		})
		it('Returns raw data as TransactionResponse when the mutation is true', async () => {
			const contract = {
				foo: jest.fn(async () =>
					Promise.resolve({
						data: BigNumber.from(123456789),
					})
				),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: true,
			})
			expect(result).toEqual({
				data: BigNumber.from(123456789),
			})
		})
	})
})
