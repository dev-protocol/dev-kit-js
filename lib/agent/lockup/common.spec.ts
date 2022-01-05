import { testProviders } from '../common/const'
import { createLockupContract } from '../../ethereum/lockup'
import { getLockupContract } from './common'
import { addresses } from '../../addresses'
import { createRegistryContract } from '../../ethereum/registry/index'
import { createLockupContract as createLockupContractL2 } from '../../l2/lockup/index'

describe('common.ts', () => {
	const arbitrumOneLockup = addresses.arbitrum.one.lockup
	const arbitrumRinkebyLockup = addresses.arbitrum.rinkeby.lockup

	describe('getLockupContract', () => {
		it('provider is homestead', async () => {
			const expectedLockup = await createLockupContract(testProviders.homestead)
			const lockupAddress = await createRegistryContract(
				testProviders.homestead
			)(addresses.eth['main'].registry).lockup()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(testProviders.homestead)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is ropsten', async () => {
			const expectedLockup = await createLockupContract(testProviders.ropsten)
			const lockupAddress = await createRegistryContract(testProviders.ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			const expected = await expectedLockup(lockupAddress)
			const result = await getLockupContract(testProviders.ropsten)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is arbitrum one', async () => {
			const expectedLockup = await createLockupContractL2(testProviders.arbOne)
			const expected = await expectedLockup(arbitrumOneLockup)
			const result = await getLockupContract(testProviders.arbOne)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('provider is arbitrum rinkeby', async () => {
			const expectedLockup = await createLockupContractL2(
				testProviders.arbRinkeby
			)
			const expected = await expectedLockup(arbitrumRinkebyLockup)
			const result = await getLockupContract(testProviders.arbRinkeby)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
		it('use cache', async () => {
			const expectedLockup = await createLockupContract(testProviders.ropsten)
			const lockupAddress = await createRegistryContract(testProviders.ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			const expected = await expectedLockup(lockupAddress)
			const result1 = await getLockupContract(testProviders.ropsten)
			const result2 = await getLockupContract(testProviders.ropsten)
			expect(JSON.stringify(result1)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result2)).toEqual(JSON.stringify(expected))
		})
		it('provider is unknown', async () => {
			const expected = undefined
			const result = await getLockupContract(testProviders.polyMumbai)
			expect(result).toEqual(expected)
		})
	})
})
