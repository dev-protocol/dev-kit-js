/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Contract,
	HDNodeWallet,
	JsonRpcProvider,
	ZeroHash,
	ethers,
	getAddress,
	keccak256,
	toUtf8Bytes,
} from 'ethers'
import { execute } from './execute'

const abi = [
	{
		inputs: [],
		name: '_a',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: '_b',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: '_c',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: '_d',
		outputs: [
			{
				internalType: 'bytes32',
				name: 'a',
				type: 'bytes32',
			},
			{
				internalType: 'uint256',
				name: 'b',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'c',
				type: 'uint256[]',
			},
			{
				internalType: 'uint256[]',
				name: 'e',
				type: 'uint256[]',
			},
		],
		name: 'fn_array',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'c',
				type: 'uint256[]',
			},
		],
		name: 'fn_array',
		outputs: [
			{
				internalType: 'uint256[]',
				name: '',
				type: 'uint256[]',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'a',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'b',
				type: 'uint256',
			},
		],
		name: 'fn_mutable',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'a',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'b',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'e',
				type: 'uint256',
			},
		],
		name: 'fn_mutable',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'a',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'b',
						type: 'uint256',
					},
				],
				internalType: 'struct Debug.Data',
				name: 'd',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'a',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'b',
						type: 'uint256',
					},
				],
				internalType: 'struct Debug.Data',
				name: 'e',
				type: 'tuple',
			},
		],
		name: 'fn_struct',
		outputs: [
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'a',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'b',
						type: 'uint256',
					},
				],
				internalType: 'struct Debug.Data',
				name: '',
				type: 'tuple',
			},
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'a',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'b',
						type: 'uint256',
					},
				],
				internalType: 'struct Debug.Data',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'a',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'b',
						type: 'uint256',
					},
				],
				internalType: 'struct Debug.Data',
				name: 'd',
				type: 'tuple',
			},
		],
		name: 'fn_struct',
		outputs: [
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'a',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'b',
						type: 'uint256',
					},
				],
				internalType: 'struct Debug.Data',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'a',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'b',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'e',
				type: 'uint256',
			},
		],
		name: 'fn_view',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'a',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'b',
				type: 'uint256',
			},
		],
		name: 'fn_view',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
]
/**
 * The ABI is generated by...
// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

contract Debug {
    struct Data {
        bytes32 a;
        uint256 b;
    }
    uint256 public _a;
    uint256 public _b;
    uint256[] public _c;
    Data public _d;

    function fn_mutable(uint256 a, uint256 b)
        public
        returns (uint256, uint256)
    {
        _a = a;
        _b = b;
        return (_a, _b);
    }

    function fn_mutable(
        uint256 a,
        uint256 b,
        uint256 e
    )
        public
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        _a = a;
        _b = b;
        return (_a, _b, e);
    }

    function fn_view(uint256 a, uint256 b)
        public
        view
        returns (uint256, uint256)
    {
        return (a + _a, b + _b);
    }

    function fn_view(
        uint256 a,
        uint256 b,
        uint256 e
    )
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (a + _a, b + _b, e);
    }

    function fn_array(uint256[] memory c) public returns (uint256[] memory) {
        _c = c;
        return _c;
    }

    function fn_array(uint256[] memory c, uint256[] memory e)
        public
        returns (uint256[] memory, uint256[] memory)
    {
        _c = c;
        return (_c, e);
    }

    function fn_struct(Data memory d) public returns (Data memory) {
        _d = d;
        return _d;
    }

    function fn_struct(Data memory d, Data memory e)
        public
        returns (Data memory, Data memory)
    {
        _d = d;
        return (_d, e);
    }
}

 */

describe('execute.ts', () => {
	describe('execute', () => {
		describe('contract method detection', () => {
			const wallet = HDNodeWallet.createRandom().connect(
				new JsonRpcProvider('https://polygon-rpc.com'),
			)
			const genContract = () =>
				new Contract(
					'0x10ce91CDC6dbE80BA4c6CbF6F287c7B957FC07a0', // <== Deployed on Polygon
					abi,
					wallet,
				)
			describe('calling mutable function', () => {
				it('calling mutable function', async () => {
					const contract = genContract()
					const spy = jest
						.spyOn(contract, 'fn_mutable')
						.mockImplementation(() => Promise.resolve('value'))
					const result = await execute({
						contract,
						method: 'fn_mutable',
						args: ['0', '0'],
						mutation: true,
					})
					expect(result).toEqual('value')
					expect(spy).toHaveBeenCalledWith('0', '0')
				})
				it('calling mutable function, with static=true', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_mutable',
						args: ['1', '1'],
						mutation: true,
						static: true,
					})
					expect(result).toEqual([1n, 1n])
				})
				it('calling mutable function, with static=true & interface option', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_mutable',
						args: ['1', '2'],
						mutation: true,
						static: true,
						interface: 'uint256,uint256',
					})
					expect(result).toEqual([1n, 2n])
				})
				it('calling mutable function, with static=true & interface option for overloaded method', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_mutable',
						args: ['1', '2', '3'],
						mutation: true,
						static: true,
						interface: 'uint256,uint256,uint256',
					})
					expect(result).toEqual([1n, 2n, 3n])
				})
			})
			describe('calling view function', () => {
				it('calling view function', async () => {
					const contract = genContract()
					const spy = jest
						.spyOn(contract, 'fn_view')
						.mockImplementation(() => Promise.resolve('value'))
					const result = await execute({
						contract,
						method: 'fn_view',
						args: ['0', '0'],
						mutation: false,
					})
					expect(result).toEqual('value')
					expect(spy).toHaveBeenCalledWith('0', '0')
				})
				it('calling view function, with static=true', async () => {
					const contract = genContract()
					const _a = await execute({
						contract,
						method: '_a',
						mutation: false,
					})
					const _b = await execute({
						contract,
						method: '_b',
						mutation: false,
					})
					const random = BigInt(~~(Math.random() * 10000))
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_view',
						args: [random.toString(), random.toString()],
						mutation: false,
						static: true,
					})
					expect(result).toEqual([
						(BigInt(_a) + random).toString(),
						(BigInt(_b) + random).toString(),
					])
				})
				it('calling view function, with static=true & interface option', async () => {
					const contract = genContract()
					const _a = await execute({
						contract,
						method: '_a',
						mutation: false,
					})
					const _b = await execute({
						contract,
						method: '_b',
						mutation: false,
					})
					const random = BigInt(~~(Math.random() * 10000))
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_view',
						args: [random.toString(), random.toString()],
						mutation: false,
						static: true,
						interface: 'uint256,uint256',
					})
					expect(result).toEqual([
						(BigInt(_a) + random).toString(),
						(BigInt(_b) + random).toString(),
					])
				})
				it('calling view function, with static=true & interface option for overloaded method', async () => {
					const contract = genContract()
					const _a = await execute({
						contract,
						method: '_a',
						mutation: false,
					})
					const _b = await execute({
						contract,
						method: '_b',
						mutation: false,
					})
					const random = BigInt(~~(Math.random() * 10000))
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_view',
						args: [random.toString(), random.toString(), random.toString()],
						mutation: false,
						static: true,
						interface: 'uint256,uint256,uint256',
					})
					expect(result).toEqual([
						(BigInt(_a) + random).toString(),
						(BigInt(_b) + random).toString(),
						random.toString(),
					])
				})
			})
			describe('calling function that has array args', () => {
				it('calling function that has array args', async () => {
					const contract = genContract()
					const spy = jest
						.spyOn(contract, 'fn_array')
						.mockImplementation(() => Promise.resolve('value'))
					const result = await execute({
						contract,
						method: 'fn_array',
						args: [['1', '2', '3']],
						mutation: true,
					})
					expect(result).toEqual('value')
					expect(spy).toHaveBeenCalledWith(['1', '2', '3'])
				})
				it('calling function that has array args, with static=true', async () => {
					const contract = genContract()
					const result = await execute({
						contract,
						method: 'fn_array',
						args: [['1', '2', '3']],
						mutation: true,
						static: true,
					})
					expect(result).toEqual([1n, 2n, 3n])
				})
				it('calling function that has array args, with static=true & interface option', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_array',
						args: [['1', '2', '3']],
						mutation: true,
						static: true,
						interface: 'uint256[]',
					})
					expect(result).toEqual([1n, 2n, 3n])
				})
				it('calling function that has array args, with static=true & interface option for overloaded method', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_array',
						args: [
							['1', '2', '3'],
							['4', '5', '6'],
						],
						mutation: true,
						static: true,
						interface: 'uint256[],uint256[]',
					})
					expect(result).toEqual([
						[1n, 2n, 3n],
						[4n, 5n, 6n],
					])
				})
			})
			describe('calling function that has struct args', () => {
				it('calling function that has struct args', async () => {
					const contract = genContract()
					const spy = jest
						.spyOn(contract, 'fn_struct')
						.mockImplementation(() => Promise.resolve('value'))
					const result = await execute({
						contract,
						method: 'fn_struct',
						args: [[ZeroHash, '2']],
						mutation: true,
					})
					expect(result).toEqual('value')
					expect(spy).toHaveBeenCalledWith([ZeroHash, '2'])
				})
				it('calling function that has struct args, with static=true', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_struct',
						args: [[ZeroHash, '2']],
						mutation: true,
						static: true,
					})
					expect(result).toEqual([ZeroHash, 2n])
				})
				it('calling function that has struct args, with static=true & interface option', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_struct',
						args: [[ZeroHash, '2']],
						mutation: true,
						static: true,
						interface: '(bytes32,uint256)',
					})
					expect(result).toEqual([ZeroHash, 2n])
				})
				it('calling function that has struct args, with static=true & interface option for overloaded method', async () => {
					const contract = genContract()
					/**
					 * This case will be calling `Method.staticCall`,
					 * but `staticCall` cannot spy with jest, so calling it in real.
					 */
					const result = await execute({
						contract,
						method: 'fn_struct',
						args: [
							[ZeroHash, '2'],
							[ZeroHash, '3'],
						],
						mutation: true,
						static: true,
						interface: '(bytes32,uint256),(bytes32,uint256)',
					})
					expect(result).toEqual([
						[ZeroHash, 2n],
						[ZeroHash, 3n],
					])
				})
			})
		})
		it("Execute the contract instance's `[passed method]([...passed args])` when the mutation is false.", async () => {
			const fooStub = jest.fn(async (arg1: string, arg2: string) =>
				Promise.resolve('value'),
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
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
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
				Promise.resolve(true),
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
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual('xyz')
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
					arg8: string,
					// eslint-disable-next-line max-params
				) => Promise.resolve(true),
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
		it('Uint8Array in the passed args will be conveted to string', async () => {
			const fooStub = jest.fn(async (arg1: string, arg2: string) =>
				Promise.resolve('value'),
			)
			const contract = {
				foo: fooStub,
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['abc', toUtf8Bytes('TEST')],
				mutation: false,
			})
			expect(result).toEqual('value')
			expect(fooStub.mock.calls.length).toEqual(1)
			expect(fooStub.mock.calls[0][0]).toEqual('abc')
			expect(fooStub.mock.calls[0][1]).toEqual(keccak256(toUtf8Bytes('TEST')))
		})
		it("Execute the contract instance's `[passed overloaded method]()`.", async () => {
			const fooStub = jest.fn(async () => Promise.resolve(true))
			const contract = {
				'foo(uint256)': () => {},
				'foo(uint256,address)': fooStub,
				functions: {
					'foo(uint256)': () => {},
					'foo(uint256,address)': () => {},
				},
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				args: ['1', '0x'],
				mutation: false,
				interface: 'uint256,address',
			})
			expect(result).toEqual(true)
		})
	})
	describe.skip('execute: overrides and fallbackOverrider', () => {
		// TODO: Write tests
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
				foo: jest.fn(async () => Promise.resolve(123456789n)),
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
					Promise.resolve(['value', 123456789, false, 123456789n]),
				),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual(['value', 123456789, false, '123456789'])
		})
		it('Returns array of object with stringified values when the response included array of object', async () => {
			const contract = {
				foo: jest.fn(async () =>
					Promise.resolve([
						{
							0: 'value1',
							1: 123456789,
							2: false,
							3: 123456789n,
							a: 'value',
							b: 123456789,
							c: false,
							d: 123456789n,
						},
						{
							0: 'value2',
							1: 1234567891,
							2: true,
							3: 1234567891n,
							a: 'value2',
							b: 1234567891,
							c: true,
							d: 1234567891n,
						},
					]),
				),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: false,
			})
			expect(result).toEqual([
				{
					0: 'value1',
					1: 123456789,
					2: false,
					3: '123456789',
					a: 'value',
					b: 123456789,
					c: false,
					d: '123456789',
				},
				{
					0: 'value2',
					1: 1234567891,
					2: true,
					3: '1234567891',
					a: 'value2',
					b: 1234567891,
					c: true,
					d: '1234567891',
				},
			])
		})
		it('Returns object of string, number, boolean when the response included BigNumber', async () => {
			const contract = {
				foo: jest.fn(async () =>
					Promise.resolve({
						0: 'value',
						1: 123456789,
						2: false,
						3: 123456789n,
						a: 'value',
						b: 123456789,
						c: false,
						d: 123456789n,
					}),
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
						data: 123456789n,
					}),
				),
			} as unknown as ethers.Contract
			const result = await execute({
				contract,
				method: 'foo',
				mutation: true,
			})
			expect(result).toEqual({
				data: 123456789n,
			})
		})
	})
})
