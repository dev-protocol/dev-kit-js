import { ethers } from 'ethers'
import { createLockupContract } from '../../ethereum/lockup'
import { getLockupAddress, getLockupContract } from './common'
import { addresses } from '../../addresses'
import { createDevkitContract } from '../../ethereum/contract'

describe('common.ts', () => {
	// set alchemy, infura and so on.
	const homestead = ethers.getDefaultProvider('')
	const ropsten = ethers.getDefaultProvider('')
	const arbOne = ethers.getDefaultProvider('')
	const arbRinkeby = ethers.getDefaultProvider('')

	const arbitrumOneLockup = addresses.arbitrum.one.lockup
	const arbitrumRinkebyLockup = addresses.arbitrum.rinkeby.lockup

	describe('getLockupAddress', () => {
		it('chainId is 1', async () => {
			const result = await getLockupAddress(1, homestead)
			const expected = await createDevkitContract(homestead)
				.registry(addresses.eth['main'].registry)
				['lockup']()

			expect(result).toEqual(expected)
		})
		it('chainId is 3', async () => {
			const result = await getLockupAddress(3, ropsten)
			const expected = await createDevkitContract(ropsten)
				.registry(addresses.eth['ropsten'].registry)
				['lockup']()

			expect(result).toEqual(expected)
		})
		it('chainId is 42161', async () => {
			const result = await getLockupAddress(42161, arbOne)
			expect(result).toEqual(arbitrumOneLockup)
		})
		it('chainId is 421611', async () => {
			const result = await getLockupAddress(421611, arbRinkeby)
			expect(result).toEqual(arbitrumRinkebyLockup)
		})
	})

	describe('getCreateLockupContract', () => {
		it('provider is homestead', async () => {
			const expectedLockup = await createLockupContract(homestead)
			const lockupAddress = await createDevkitContract(homestead)
				.registry(addresses.eth['main'].registry)
				['lockup']()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(homestead)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is ropsten', async () => {
			const expectedLockup = await createLockupContract(ropsten)
			const lockupAddress = await createDevkitContract(ropsten)
				.registry(addresses.eth['ropsten'].registry)
				['lockup']()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(ropsten)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is arbitrum one', async () => {
			const expectedLockup = await createLockupContract(arbOne)
			const expected = await expectedLockup(arbitrumOneLockup)
			const result = await getLockupContract(arbOne)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is arbitrum rinkeby', async () => {
			const expectedLockup = await createLockupContract(arbRinkeby)
			const expected = await expectedLockup(arbitrumRinkebyLockup)
			const result = await getLockupContract(arbRinkeby)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('use cache', async () => {
			const expectedLockup = await createLockupContract(ropsten)
			const lockupAddress = await createDevkitContract(ropsten)
				.registry(addresses.eth['ropsten'].registry)
				['lockup']()
			const expected = await expectedLockup(lockupAddress)
			const result1 = await getLockupContract(ropsten)
			const result2 = await getLockupContract(ropsten)
			expect(JSON.stringify(result1)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result2)).toEqual(JSON.stringify(expected))
		})
	})
})
