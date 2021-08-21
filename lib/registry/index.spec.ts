import { ethers } from 'ethers'
import { createRegistryContract, RegistryContract } from '.'
import { addressConfigAbi } from './abi'
import { createTokenCaller } from './token'
import { createAllocatorCaller } from './allocator'
import { createAllocatorStorageCaller } from './allocatorStorage'
import { createLockupCaller } from './lockup'
import { createLockupStorageCaller } from './lockupStorage'
import { createMarketFactoryCaller } from './marketFactory'
import { createMarketGroupCaller } from './marketGroup'
import { createMetricsFactoryCaller } from './metricsFactory'
import { createMetricsGroupCaller } from './metricsGroup'
import { createPolicyCaller } from './policy'
import { createPropertyFactoryCaller } from './propertyFactory'
import { createPropertyGroupCaller } from './propertyGroup'
import { createWithdrawCaller } from './withdraw'
import { createWithdrawStorageCaller } from './withdrawStorage'
import { createPolicyFactoryCaller } from './policyFactory'
import { createPolicySetCaller } from './policySet'
import { createPolicyGroupCaller } from './policyGroup'

jest.mock('./token')
jest.mock('./allocator')
jest.mock('./allocatorStorage')
jest.mock('./lockup')
jest.mock('./lockupStorage')
jest.mock('./marketFactory')
jest.mock('./marketGroup')
jest.mock('./metricsFactory')
jest.mock('./metricsGroup')
jest.mock('./policy')
jest.mock('./propertyFactory')
jest.mock('./propertyGroup')
jest.mock('./withdraw')
jest.mock('./withdrawStorage')
jest.mock('./policyFactory')
jest.mock('./policySet')
jest.mock('./policyGroup')

describe('registry/index.ts', () => {
	;(createTokenCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createAllocatorCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createAllocatorStorageCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createLockupCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createLockupStorageCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMarketFactoryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMarketGroupCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMetricsFactoryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMetricsGroupCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPolicyCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createPropertyFactoryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPropertyGroupCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createWithdrawCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createWithdrawStorageCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPolicyFactoryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPolicySetCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPolicyGroupCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createRegistryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => RegistryContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...addressConfigAbi],
					provider
				)

				return {
					allocator: createAllocatorCaller(contract),
					allocatorStorage: createAllocatorStorageCaller(contract),
					lockup: createLockupCaller(contract),
					lockupStorage: createLockupStorageCaller(contract),
					marketFactory: createMarketFactoryCaller(contract),
					marketGroup: createMarketGroupCaller(contract),
					metricsFactory: createMetricsFactoryCaller(contract),
					metricsGroup: createMetricsGroupCaller(contract),
					policy: createPolicyCaller(contract),
					policySet: createPolicySetCaller(contract),
					policyGroup: createPolicyGroupCaller(contract),
					policyFactory: createPolicyFactoryCaller(contract),
					propertyFactory: createPropertyFactoryCaller(contract),
					propertyGroup: createPropertyGroupCaller(contract),
					token: createTokenCaller(contract),
					withdraw: createWithdrawCaller(contract),
					withdrawStorage: createWithdrawStorageCaller(contract),
				}
			}

			const result = createRegistryContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
