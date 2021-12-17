import { homestead, ropsten, arbOne, arbRinkeby } from '../common/const'
import { createLockupContract } from '../../ethereum/lockup'
import { getLockupContract } from './common'
import { addresses } from '../../addresses'
import { createRegistryContract } from '../../ethereum/registry/index'
import { createLockupContract as createLockupContractL2 } from '../../l2/lockup/index'

describe('common.ts', () => {
	const arbitrumOneLockup = addresses.arbitrum.one.lockup
	const arbitrumRinkebyLockup = addresses.arbitrum.rinkeby.lockup

	// describe('getLockupAddress', () => {
	// 	it('chainId is 1', async () => {
	// 		const result = await getLockupAddress(homestead)
	// 		const expected = await createRegistryContract(homestead)(addresses.eth['main'].registry).lockup()

	// 		expect(result).toEqual(expected)
	// 	})
	// 	it('chainId is 3', async () => {
	// 		const result = await getLockupAddress(ropsten)
	// 		const expected = await createRegistryContract(ropsten)(addresses.eth['ropsten'].registry).lockup()
	// 		expect(result).toEqual(expected)
	// 	})
	// 	it('chainId is 42161', async () => {
	// 		const result = await getLockupAddress(arbOne)
	// 		expect(result).toEqual(arbitrumOneLockup)
	// 	})
	// 	it('chainId is 421611', async () => {
	// 		const result = await getLockupAddress(arbRinkeby)
	// 		expect(result).toEqual(arbitrumRinkebyLockup)
	// 	})
	// })

	describe('getLockupContract', () => {
		it('provider is homestead', async () => {
			const expectedLockup = await createLockupContract(homestead)
			const lockupAddress = await createRegistryContract(homestead)(
				addresses.eth['main'].registry
			).lockup()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(homestead)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is ropsten', async () => {
			const expectedLockup = await createLockupContract(ropsten)
			const lockupAddress = await createRegistryContract(ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(ropsten)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is arbitrum one', async () => {
			const expectedLockup = await createLockupContractL2(arbOne)
			const expected = await expectedLockup(arbitrumOneLockup)
			const result = await getLockupContract(arbOne)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is arbitrum rinkeby', async () => {
			const expectedLockup = await createLockupContractL2(arbRinkeby)
			const expected = await expectedLockup(arbitrumRinkebyLockup)
			const result = await getLockupContract(arbRinkeby)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('use cache', async () => {
			const expectedLockup = await createLockupContract(ropsten)
			const lockupAddress = await createRegistryContract(ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			const expected = await expectedLockup(lockupAddress)
			const result1 = await getLockupContract(ropsten)
			const result2 = await getLockupContract(ropsten)
			expect(JSON.stringify(result1)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result2)).toEqual(JSON.stringify(expected))
		})
	})
})
