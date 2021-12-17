import { getContractAddress } from './getContractAddress'
import { addresses } from '../../addresses'
import { createRegistryContract } from '../../ethereum/registry/index'
import { homestead, ropsten, arbOne, arbRinkeby } from './const'

describe('getContractAddress.ts', () => {
	describe('getContractAddress', () => {
		it('chainId is 1 with lockup contract', async () => {
			const result = await getContractAddress(homestead, 'lockup')
			const expected = await createRegistryContract(homestead)(
				addresses.eth['main'].registry
			).lockup()
			expect(result).toEqual(expected)
		})
		it('chainId is 1 with withdraw', async () => {
			const result = await getContractAddress(homestead, 'withdraw')
			const expected = await createRegistryContract(homestead)(
				addresses.eth['main'].registry
			).withdraw()
			expect(result).toEqual(expected)
		})
		it('chainId is 3 with lockup', async () => {
			const result = await getContractAddress(ropsten, 'lockup')
			const expected = await createRegistryContract(ropsten)(
				addresses.eth['ropsten'].registry
			).lockup()
			expect(result).toEqual(expected)
		})
		it('chainId is 3 with token', async () => {
			const result = await getContractAddress(ropsten, 'token')
			const expected = await createRegistryContract(ropsten)(
				addresses.eth['ropsten'].registry
			).token()
			expect(result).toEqual(expected)
		})
		it('chainId is 42161 with lockup', async () => {
			const result = await getContractAddress(arbOne, 'lockup')
			const expected = addresses.arbitrum.one.lockup
			expect(result).toEqual(expected)
		})
		it('chainId is 42161 with policyFactroy', async () => {
			const result = await getContractAddress(arbOne, 'policyFactory')
			const expected = addresses.arbitrum.one.policyFactory
			expect(result).toEqual(expected)
		})
		it('chainId is 421611', async () => {
			const result = await getContractAddress(arbRinkeby, 'lockup')
			const expected = addresses.arbitrum.rinkeby.lockup
			expect(result).toEqual(expected)
		})
		it('chainId is 421611 with sTokens', async () => {
			const result = await getContractAddress(arbRinkeby, 'sTokens')
			const expected = addresses.arbitrum.rinkeby.sTokens
			expect(result).toEqual(expected)
		})
	})
})
