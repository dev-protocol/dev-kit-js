import { getL1ContractAddress, getL2ContractAddress, isMainNet } from './utils'
import { addresses } from '../../addresses'
import { createRegistryContract } from '../../ethereum/registry/index'
import { homestead, ropsten, arbOne, arbRinkeby } from './const'

describe('getContractAddress.ts', () => {
	describe('isMainNet', () => {
		it('return true if chainId is 1', async () => {
			const resutl = await isMainNet(1)
			expect(resutl).toEqual(true)
		})
		it('return true if chainId is 3', async () => {
			const resutl = await isMainNet(3)
			expect(resutl).toEqual(true)
		})
		it('return false if chainId is 42161', async () => {
			const resutl = await isMainNet(42161)
			expect(resutl).toEqual(false)
		})
		it('return false if chainId is 421611', async () => {
			const resutl = await isMainNet(421611)
			expect(resutl).toEqual(false)
		})
	})

	describe('getL1ContractAddress', () => {
		it('chainId is 1 with lockup contract', async () => {
			const result = await getL1ContractAddress(homestead, 'lockup')
			const expected = await createRegistryContract(homestead)(
				addresses.eth['main'].registry
			).lockup()
			expect(result).toEqual(expected)
		})
		it('chainId is 1 with withdraw', async () => {
			const result = await getL1ContractAddress(homestead, 'withdraw')
			const expected = await createRegistryContract(homestead)(
				addresses.eth['main'].registry
			).withdraw()
			expect(result).toEqual(expected)
		})
		it('chainId is 3 with lockup', async () => {
			const result = await getL1ContractAddress(ropsten, 'lockup')
			const expected = await createRegistryContract(ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			expect(result).toEqual(expected)
		})
		it('chainId is 3 with token', async () => {
			const result = await getL1ContractAddress(ropsten, 'token')
			const expected = await createRegistryContract(ropsten)(
				addresses.eth['ropsten'].registry
			).token()
			expect(result).toEqual(expected)
		})
	})

	describe('getL2ContractAddress', () => {
		it('chainId is 42161 with lockup', async () => {
			const result = await getL2ContractAddress(arbOne, 'lockup')
			const expected = addresses.arbitrum.one.lockup
			expect(result).toEqual(expected)
		})
		it('chainId is 42161 with policyFactroy', async () => {
			const result = await getL2ContractAddress(arbOne, 'policyFactory')
			const expected = addresses.arbitrum.one.policyFactory
			expect(result).toEqual(expected)
		})
		it('chainId is 421611', async () => {
			const result = await getL2ContractAddress(arbRinkeby, 'lockup')
			const expected = addresses.arbitrum.rinkeby.lockup
			expect(result).toEqual(expected)
		})
		it('chainId is 421611 with sTokens', async () => {
			const result = await getL2ContractAddress(arbRinkeby, 'sTokens')
			const expected = addresses.arbitrum.rinkeby.sTokens
			expect(result).toEqual(expected)
		})
	})
})
