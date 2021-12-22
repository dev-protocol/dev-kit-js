import { getL1ContractAddress, getL2ContractAddress, isL1 } from './utils'
import { addresses } from '../../addresses'
import { createRegistryContract } from '../../ethereum/registry/index'
import { testProviders } from './const'

describe('getContractAddress.ts', () => {
	describe('isL1', () => {
		it('return true if chainId is 1', async () => {
			const resutl = await isL1(1)
			expect(resutl).toEqual(true)
		})
		it('return true if chainId is 3', async () => {
			const resutl = await isL1(3)
			expect(resutl).toEqual(true)
		})
		it('return false if chainId is 42161', async () => {
			const resutl = await isL1(42161)
			expect(resutl).toEqual(false)
		})
		it('return false if chainId is 421611', async () => {
			const resutl = await isL1(421611)
			expect(resutl).toEqual(false)
		})
	})

	describe('getL1ContractAddress', () => {
		it('return mainnet lockup contract address', async () => {
			const result = await getL1ContractAddress(
				testProviders.homestead,
				'lockup'
			)
			const expected = await createRegistryContract(testProviders.homestead)(
				addresses.eth['main'].registry
			).lockup()
			expect(result).toEqual(expected)
		})
		it('return mainnet withdraw contract address', async () => {
			const result = await getL1ContractAddress(
				testProviders.homestead,
				'withdraw'
			)
			const expected = await createRegistryContract(testProviders.homestead)(
				addresses.eth['main'].registry
			).withdraw()
			expect(result).toEqual(expected)
		})
		it('return ropsten lockup contract address', async () => {
			const result = await getL1ContractAddress(testProviders.ropsten, 'lockup')
			const expected = await createRegistryContract(testProviders.ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			expect(result).toEqual(expected)
		})
		it('return ropsten token contract address', async () => {
			const result = await getL1ContractAddress(testProviders.ropsten, 'token')
			const expected = await createRegistryContract(testProviders.ropsten)(
				addresses.eth['ropsten'].registry
			).token()
			expect(result).toEqual(expected)
		})
		it('return null if network neither mainnet nor ropsten', async () => {
			const result = await getL1ContractAddress(
				testProviders.polyMumbai,
				'lockup'
			)
			const expected = null
			expect(result).toEqual(expected)
		})
	})

	describe('getL2ContractAddress', () => {
		it('chainId is 42161 with lockup', async () => {
			const result = await getL2ContractAddress(testProviders.arbOne, 'lockup')
			const expected = addresses.arbitrum.one.lockup
			expect(result).toEqual(expected)
		})
		it('chainId is 42161 with policyFactroy', async () => {
			const result = await getL2ContractAddress(
				testProviders.arbOne,
				'policyFactory'
			)
			const expected = addresses.arbitrum.one.policyFactory
			expect(result).toEqual(expected)
		})
		it('chainId is 421611', async () => {
			const result = await getL2ContractAddress(
				testProviders.arbRinkeby,
				'lockup'
			)
			const expected = addresses.arbitrum.rinkeby.lockup
			expect(result).toEqual(expected)
		})
		it('chainId is 421611 with sTokens', async () => {
			const result = await getL2ContractAddress(
				testProviders.arbRinkeby,
				'sTokens'
			)
			const expected = addresses.arbitrum.rinkeby.sTokens
			expect(result).toEqual(expected)
		})
		it('return null if network neither mainnet nor ropsten', async () => {
			const result = await getL2ContractAddress(
				testProviders.polyMumbai,
				'lockup'
			)
			const expected = null
			expect(result).toEqual(expected)
		})
	})
})
