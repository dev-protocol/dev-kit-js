import { createSwapTokensAndStakeDevCaller } from './swapTokensAndStakeDev'
import { stubTransactionResposeFactory } from '../../../common/utils/for-test'
import { ZeroHash } from 'ethers'

describe('swapTokensAndStakeDev.spec.ts', () => {
	describe('createSwapTokensAndStakeDevCaller: ERC20, with gateway', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})
			const swapContract = {
				'swapTokensAndStakeDev(address,address,bytes,address,uint256,uint256,uint256,bytes32,address,uint256)':
					() => Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000',
			)

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const swapContract = {
				'swapTokensAndStakeDev(address,address,bytes,address,uint256,uint256,uint256,bytes32,address,uint256)':
					jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
	describe('createSwapTokensAndStakeDevCaller: ERC20, without gateway', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})
			const swapContract = {
				'swapTokensAndStakeDev(address,address,bytes,address,uint256,uint256,uint256,bytes32)':
					() => Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			)

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const swapContract = {
				'swapTokensAndStakeDev(address,address,bytes,address,uint256,uint256,uint256,bytes32)':
					jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
	describe('createSwapTokensAndStakeDevCaller: Calling payable, with gateway', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})
			const swapContract = {
				'swapTokensAndStakeDev(address,bytes,address,uint256,uint256,bytes32,address,uint256)':
					() => Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				undefined,
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000',
			)

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const swapContract = {
				'swapTokensAndStakeDev(address,bytes,address,uint256,uint256,bytes32,address,uint256)':
					jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				undefined,
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
	describe('createSwapTokensAndStakeDevCaller: Calling payable, without gateway', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})
			const swapContract = {
				'swapTokensAndStakeDev(address,bytes,address,uint256,uint256,bytes32)':
					() => Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				undefined,
			)

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const swapContract = {
				'swapTokensAndStakeDev(address,bytes,address,uint256,uint256,bytes32)':
					jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapTokensAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				[
					'0xA5577D1cec2583058A6Bd6d5DEAC44797c205701',
					10000n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
					500n,
					'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				],
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'1000000000000000000',
				Math.floor(new Date().getTime() / 1000) + 300,
				'1000000000000000000',
				ZeroHash,
				undefined,
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
