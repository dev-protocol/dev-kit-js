import Web3 from 'web3'
import { createRegistryContract, RegistryContract } from '.'
import { addressConfigAbi } from './abi'
import { CustomOptions } from '../option'
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

describe('registry/index.ts', () => {
	describe('createRegistryContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => RegistryContract = (address?: string, options?: CustomOptions) => {
				const registryContract = new client.eth.Contract(
					[...addressConfigAbi],
					address,
					{
						...options,
					}
				)
				return {
					allocator: createAllocatorCaller(registryContract),
					allocatorStorage: createAllocatorStorageCaller(registryContract),
					lockup: createLockupCaller(registryContract),
					lockupStorage: createLockupStorageCaller(registryContract),
					marketFactory: createMarketFactoryCaller(registryContract),
					marketGroup: createMarketGroupCaller(registryContract),
					metricsFactory: createMetricsFactoryCaller(registryContract),
					metricsGroup: createMetricsGroupCaller(registryContract),
					policy: createPolicyCaller(registryContract),
					policySet: createPolicySetCaller(registryContract),
					policyFactory: createPolicyFactoryCaller(registryContract),
					propertyFactory: createPropertyFactoryCaller(registryContract),
					propertyGroup: createPropertyGroupCaller(registryContract),
					token: createTokenCaller(registryContract),
					withdraw: createWithdrawCaller(registryContract),
					withdrawStorage: createWithdrawStorageCaller(registryContract),
				}
			}

			const result = createRegistryContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
